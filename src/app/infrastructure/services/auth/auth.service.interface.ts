export interface Login {
  email: string,
  password: string
}

export interface LoginResponse {
  auth_token: string
}

export interface ForgotPassword {
  email: string
}

export interface ResetPassword {
  new_password: string,
  new_password_confirmation: string
}