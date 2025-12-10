import { Outlet, useNavigate } from 'react-router-dom'
import useUser from './hooks/useUser'
import Header from './components/Header'

const App = () => {
  const navigate = useNavigate()
  const { user, clearUser } = useUser()

  const handleLogout = () => {
    localStorage.removeItem('token')
    clearUser()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App
