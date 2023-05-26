import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { unloggedUserGuard } from 'src/app/infrastructure/guards/auth.guard';
import { UnloggedAreaComponent } from './unlogged-area.component';

const routes: Routes = [
  { 
    path: '',
    component: UnloggedAreaComponent,
    canActivate: [unloggedUserGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/login' },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnloggedAreaRoutingModule { }
