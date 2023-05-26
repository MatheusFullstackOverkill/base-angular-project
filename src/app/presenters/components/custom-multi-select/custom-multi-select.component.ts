import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild, forwardRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from './custom-multi-select.interface';

@Component({
  selector: 'app-custom-multi-select',
  templateUrl: './custom-multi-select.component.html',
  styleUrls: ['./custom-multi-select.component.sass'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomMultiSelectComponent),
      multi: true,
    }
  ]
})
export class CustomMultiSelectComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
  @ViewChild('customSelect') customSelect!: ElementRef;
  @Input() name = '';
  @Input() label = '';
  @Input() disable = false;
  @Input() type = 'text';
  @Input() values: string[] = [];
  @Input() errors: string[] | undefined = [];
  @Input() options: SelectOption[] = [];
  shownOptions: SelectOption[] = [];
  @Input() disabledOptions: string[] = [];
  @Input() form: FormGroup = new FormGroup({});
  @Input() formControlName = '';
  @Output() changed: EventEmitter<string[]> = new EventEmitter();
  @Output() valueChange: EventEmitter<string[]> = new EventEmitter();
  showOptions = false;

  ngAfterViewInit() {
    this.shownOptions = this.options;
    document.addEventListener('click', e => {
      const node: HTMLElement = e.target as HTMLElement;
      if(!this.customSelect.nativeElement.contains(node)) {
        this.showOptions = false;
        this.shownOptions = this.options;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.form && changes['form']?.previousValue === undefined) {
      this.form.get(this.formControlName)?.valueChanges.subscribe(value => {
        this.values = value;
      });
    }
    if(changes['options']?.currentValue) {
      this.shownOptions = this.options;
    }
  }

  onSearch(e: Event) {
    this.shownOptions = this.options.filter(x => x.label.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase()));
  }

  onSelectOption(value: string) {
    if(this.values.includes(value)) {
      this.values = this.values.filter(x => x !== value);
    } else {
      this.values.push(value);
    }
    if(value == '') {
      this.values = [];
    }
    this.form.get(this.formControlName)?.setValue(this.values);
    this.changed.emit(this.values);
    this.valueChange.emit(this.values);
  }

  toggleOptions(e: MouseEvent) {
    if(e && (e.target as HTMLElement).nodeName === 'LABEL') return;
    this.showOptions = !this.showOptions;
    this.errors = [];
  }

  writeValue() {
    //
  }

  registerOnChange() {
    //
  }

  registerOnTouched() {
    //
  }
}
