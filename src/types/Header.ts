import { User } from './User'

export interface HeaderProps {
  user: User | null
  onLogout: () => void
}

export interface NavItem {
  path: string
  label: string
  color: string
  requiresAuth?: boolean
  requiresAdmin?: boolean
}
