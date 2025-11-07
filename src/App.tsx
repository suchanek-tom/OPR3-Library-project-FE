import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { User } from './types/User'

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-3xl font-bold text-gray-900">📚 Library System</h1>
            <div className="flex gap-4 items-center">
              {user && (
                <Link to="/profile" className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                  👤 {user.name || user.email}
                </Link>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Login
                </Link>
              )}
            </div>
          </div>
          <nav className="flex gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Home</Link>
            <span className="text-gray-300">|</span>
            <Link to="/books" className="text-blue-600 hover:text-blue-800 font-medium">Books</Link>
            {user && (
              <>
                <span className="text-gray-300">|</span>
                <Link to="/loans" className="text-blue-600 hover:text-blue-800 font-medium">My Loans</Link>
              </>
            )}
            {user && user.role === 'ROLE_ADMIN' && (
              <>
                <span className="text-gray-300">|</span>
                <Link to="/books/add" className="text-green-600 hover:text-green-800 font-medium">+ Add Book</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App
