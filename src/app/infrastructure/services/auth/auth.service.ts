import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPassword, Login, LoginResponse, ResetPassword } from './auth.service.interface';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment.example';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  onLogin(data: Login) {
    return lastValueFrom(this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, data));
  }

  onForgotPassword(data: ForgotPassword) {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/api/auth/password/forgot`, data));
  }

  validatePasswordToken(token: string) {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/api/auth/password/token/validate`));
  }

  onResetPassword(data: ResetPassword, token: string) {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/api/auth/password/reset`, data));
  }

}
