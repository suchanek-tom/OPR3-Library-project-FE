import { FC, useEffect, useState } from 'react'
import { User } from '../types/User'

const Home: FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome, {user?.name || 'Guest'}</h2>
      <p className="text-gray-600 text-lg">Welcome to the Library System. Use the navigation to view books and explore our collection.</p>
    </div>
  )
}

export default Home
