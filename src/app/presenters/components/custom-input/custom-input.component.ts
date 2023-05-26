import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.sass'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    }
  ]
})
export class CustomInputComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() name = ''
  @Input() label = ''
  @Input() disabled = false
  @Input() type = 'text'
  @Input() min = 0
  @Input() textarea = false
  @Input() value: string | number | undefined = ''
  @Input() isTOTP = false
  @Input() errors: string[] | undefined = []
  @Input() form: FormGroup = new FormGroup({ value: new FormControl() })
  @Input() formControlName = 'value'
  @Input() mask: (string | RegExp)[] | null = null
  @Output() changed: EventEmitter<string> = new EventEmitter()
  @Output() valueChange: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
    document.addEventListener('keyup', e => {
      if(e.keyCode === 13) {
        e.preventDefault();
      }
    });
  }

  ngOnChanges() {
    if(this.form.get('value')) {
      this.form.get('value')?.setValue(this.value);
    }
    if(this.form.get(this.formControlName)) {
      this.form.get(this.formControlName)?.valueChanges.subscribe(value => {
        this.value = value;
      })
    }
    if(this.errors) {
      let errors: string[] = [];
      this.errors.map(x => {
        errors = errors.concat(x);
      })
      this.errors = errors;
    }
  }

  onChange(e: Event) {
    if ((e as InputEvent).isComposing) {
      return;
    }
    this.value = (e.target as HTMLInputElement).value;
    this.changed.emit(this.value);
    this.valueChange.emit(this.value);
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
