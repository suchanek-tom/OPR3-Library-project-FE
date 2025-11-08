export enum UserRole {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}

export interface User {
  id: number
  name: string
  surname: string
  email: string
  address: string
  city: string
  password?: string
  role: UserRole
}

export interface UserWithStats extends User {
  loanStats: {
    borrowed: number
    returned: number
    total: number
  }
}

export interface StatCard {
  label: string
  value: number
  color: string
}


export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  id: number
  email: string
  name: string
}
