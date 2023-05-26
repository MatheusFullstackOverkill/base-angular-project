import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/infrastructure/services/auth/auth.service';
import { CustomValidators, formValidator } from 'src/app/infrastructure/utils/form';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent {
  form: FormGroup = new FormGroup({ 
    email: new FormControl('', [CustomValidators.required()]) 
  });
  formErrors: Record<string, string[]> = {};
  formLoading = false; 

  constructor(private authService: AuthService, private messageService: MessageService) {};

  async onSubmit() {
    if(!formValidator(this.form, this.formErrors)) return;
    try {
      this.formLoading = true;
      await this.authService.onForgotPassword(this.form.value);
      this.formLoading = false;
      this.messageService.add({ severity: 'success', summary: 'Email enviado com sucesso!' });
      this.form.get('email')?.setValue('');
    } catch (error) {
      console.log((error as HttpErrorResponse).error.error)
      this.messageService.add({ severity: 'error', summary: 'Ocorreu um erro inesperado com enviar o email' });
      this.formLoading = false;
    }
  }

}
