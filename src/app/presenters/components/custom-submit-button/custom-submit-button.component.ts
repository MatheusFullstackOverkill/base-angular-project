import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-submit-button',
  templateUrl: './custom-submit-button.component.html',
  styleUrls: ['./custom-submit-button.component.sass'],
  standalone: true
})
export class CustomSubmitButtonComponent {
  @Input() loading = false
  @Input() customClass = 'primary'
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  text = 'Enviar'
  loadingText = 'Enviando'
  
  onSubmit() {
    this.submit.emit(true);
  }
}
