import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UnloggedAreaRoutingModule } from './unlogged-area-routing.module';
import { UnloggedAreaComponent } from './unlogged-area.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { CustomSelectComponent } from '../../components/custom-select/custom-select.component';
import { CustomDialogComponent } from '../../components/custom-dialog/custom-dialog.component';
import { CustomSubmitButtonComponent } from '../../components/custom-submit-button/custom-submit-button.component';


@NgModule({
  declarations: [
    UnloggedAreaComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    UnloggedAreaRoutingModule,
    CustomInputComponent,
    CustomSelectComponent,
    CustomDialogComponent,
    CustomSubmitButtonComponent,
    ReactiveFormsModule
  ]
})
export class UnloggedAreaModule { }
