import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/infrastructure/services/auth/auth.service';
import { encrypt } from 'src/app/infrastructure/utils/encrypt';
import { CustomValidators, formValidator } from 'src/app/infrastructure/utils/form';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({ 
    new_password: new FormControl('', [CustomValidators.required()]),
    new_password_confirmation: new FormControl('', [CustomValidators.required()])
  });
  formErrors: Record<string, string[]> = {};
  formLoading = false;
  authToken = '';
  invalidToken: boolean | null = null;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router, private currentRoute: ActivatedRoute) {};

  ngOnInit() {
    this.getAuthToken();
  }

  getAuthToken() {
    this.currentRoute.queryParams.subscribe(async x => {
      this.authToken = x['token'];
      localStorage.removeItem('auth_token');

      if(!this.authToken) {
        this.router.navigate(['/login']);
        return;
      };

      try {
        localStorage.setItem('auth_token', this.authToken);
        await this.authService.validatePasswordToken(this.authToken);
        localStorage.removeItem('auth_token');
        this.invalidToken = false;
      } catch (error) {
        console.log((error as HttpErrorResponse).error.error);
        localStorage.removeItem('auth_token');
        this.invalidToken = true;
      }
    });
  }

  async onSubmit() {
    if(!formValidator(this.form, this.formErrors)) return;
    try {
      this.formLoading = true;

      localStorage.setItem('auth_token', this.authToken);
      await this.authService.onResetPassword({
        new_password: encrypt(this.form.value.new_password) as string,
        new_password_confirmation: encrypt(this.form.value.new_password) as string
      }, this.authToken);
      localStorage.removeItem('auth_token');

      this.formLoading = false;
      this.messageService.add({ severity: 'success', summary: 'Senha alterada com sucesso!' });
      this.router.navigate(['/login']);
    } catch (error) {
      console.log((error as HttpErrorResponse).error.error)
      this.messageService.add({ severity: 'error', summary: 'Ocorreu um erro inesperado alterar senha' });
      this.formLoading = false;
    }
  }
}
