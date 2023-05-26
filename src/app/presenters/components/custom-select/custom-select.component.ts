import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, Output, ViewChild, SimpleChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from './custom-select.interface';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.sass'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    }
  ]
})
export class CustomSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  @ViewChild('customSelect') customSelect!: ElementRef;
  @Input() public name = '';
  @Input() public label = '';
  @Input() public disable = false;
  @Input() public type = 'text';
  @Input() public value: string | undefined = '';
  @Input() public errors: string[] | undefined = [];
  @Input() public options: SelectOption[] = [];
  public shownOptions: SelectOption[] = [];
  @Input() public disabledOptions: string[] = [];
  @Input() public form: FormGroup = new FormGroup({});
  @Input() public formControlName = '';
  @Output() public changed: EventEmitter<string> = new EventEmitter();
  @Output() public valueChange: EventEmitter<string> = new EventEmitter();
  public showOptions = false;
  public selectedOption: SelectOption | null = null;

  ngOnInit() {
    this.shownOptions = this.options;
    document.addEventListener('click', e => {
      const node: HTMLElement = e.target as HTMLElement;
      if(!this.customSelect.nativeElement.contains(node)) {
        this.showOptions = false;
        this.shownOptions = this.options;
      }
    });
    if(this.form.get(this.formControlName)) {
      this.value = this.form.get(this.formControlName)?.value;
      this.form.get(this.formControlName)?.valueChanges.subscribe(value => {
        this.value = value;
        this.selectedOption = this.options.filter(x => x.value+'' === value+'')[0];
      });
    }
    this.selectedOption = this.options.filter(x => x.value === this.value)[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedOption = this.options.filter(x => x.value+'' === this.value+'')[0];
    if(changes['options'] && changes['options']?.currentValue) {
      this.shownOptions = this.options;
    }
  }

  onSearch(e: Event) {
    this.shownOptions = this.options.filter(x => x.label.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase()));
  }

  onSelectOption(value: string) {
    this.value = value;
    this.selectedOption = this.options.filter(x => x.value+'' === value+'')[0];
    this.form.get(this.formControlName)?.setValue(value);
    this.valueChange.emit(this.value);
    this.changed.emit(this.value);
    this.toggleOptions(null);
  }

  toggleOptions(e: MouseEvent | null) {
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
