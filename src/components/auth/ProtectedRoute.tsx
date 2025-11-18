import { Navigate } from 'react-router-dom'
import { ReactNode, FC } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token')
  
  if (!token || token.length < 10) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
