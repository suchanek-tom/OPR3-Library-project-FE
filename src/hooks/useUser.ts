import { useEffect, useState } from 'react'
import { User } from '../types/User'

const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error)
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [])

  const clearUser = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return { user, isLoading, clearUser, updateUser }
}

export default useUser
