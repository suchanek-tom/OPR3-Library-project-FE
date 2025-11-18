import { ReactNode } from "react"

export interface AuthLinkProps {
  text: string
  linkText: string
  linkTo: '/login' | '/register'
}

export interface ProtectedRouteProps {
  children: ReactNode
}

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

export interface ErrorMessageProps {
  message: string
}

export interface SuccessMessageProps {
  message: string
}
