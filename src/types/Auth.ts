export interface LoginFormInputs {
  email: string
  password: string
}

export interface LoginResponse {
  id: number
  email: string
  name: string
  surname: string
  address: string
  city: string
  role: string
  token: string
}

export interface RegisterFormInputs {
  name: string
  surname: string
  email: string
  address: string
  city: string
  password: string
  confirmPassword: string
}
