import { Navigate } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { ProtectedRouteProps } from '../../types/Auth'

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')
      
      // No token or invalid token length
      if (!token || token.length < 10) {
        handleLogout()
        setIsValidating(false)
        return
      }

      try {
        // Verify token by making a test request to the API
        const response = await fetch('http://localhost:8080/api/books', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.status === 401 || response.status === 403) {
          // Token is invalid or expired
          handleLogout()
          setIsAuthenticated(false)
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        // Network error or server down - allow access for now
        setIsAuthenticated(true)
      } finally {
        setIsValidating(false)
      }
    }

    validateToken()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (isValidating) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Validating access...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

