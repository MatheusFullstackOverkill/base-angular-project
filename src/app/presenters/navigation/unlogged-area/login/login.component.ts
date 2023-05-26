import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/infrastructure/services/auth/auth.service';
import { encrypt } from 'src/app/infrastructure/utils/encrypt';
import { errorMapper } from 'src/app/infrastructure/utils/errorMapper';
import { CustomValidators, formValidator } from 'src/app/infrastructure/utils/form';
import { parseJwt } from 'src/app/infrastructure/utils/JWTParser';
import { emailValidator } from 'src/app/infrastructure/utils/regex';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  formBuilder: FormBuilder = new FormBuilder();
  form: FormGroup = new FormGroup({});
  loadingForm = false;
  errors: Record<string, string[]> = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {};

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: new FormControl('', [CustomValidators.format(emailValidator, 'Email inválido')]),
      password: new FormControl('', [CustomValidators.required()])
    })
  }

  async onSubmit() {
    try {
      if(formValidator(this.form, this.errors)) {
        this.loadingForm = true;
        const response = await this.authService.onLogin({...this.form.value, password: encrypt(this.form.value.password)});
        localStorage.setItem('auth_token', response.auth_token);
        localStorage.setItem('user_id', parseJwt(response.auth_token).user_id);
        this.router.navigate(['/dashboard']);
      };
    } catch (error) {
      this.loadingForm = false;
      this.messageService.clear();
      this.messageService.add({ summary: errorMapper((error as HttpErrorResponse).error.error), severity: 'error' });
    }
  }

}
