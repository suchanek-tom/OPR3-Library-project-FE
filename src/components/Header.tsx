import { Link } from 'react-router-dom'
import { FiUser, FiLogOut, FiLogIn, FiMenu, FiX } from 'react-icons/fi'
import { HeaderProps, NavItem } from '../types/Header'
import { useState } from 'react'

const Header = ({ user, onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { path: '/', label: 'Home', color: 'blue' },
    { path: '/books', label: 'Books', color: 'blue' },
    { path: '/loans', label: 'Loans', color: 'blue', requiresAuth: true },
    { path: '/books/add', label: '+ Add Book', color: 'green', requiresAdmin: true },
    { path: '/admin/users', label: 'Admin Panel', color: 'red', requiresAdmin: true },
  ]

  const getNavLinkClass = (color: string) => {
    const colorClasses = {
      blue: 'text-blue-600 hover:text-blue-800',
      green: 'text-green-600 hover:text-green-800',
      red: 'text-red-600 hover:text-red-800',
    }
    return colorClasses[color as keyof typeof colorClasses] || colorClasses.blue
  }

  const filteredNavItems = navItems.filter(item => {
    if (item.requiresAdmin && (!user || user.role !== 'ROLE_ADMIN')) return false
    if (item.requiresAuth && !user) return false
    return true
  })

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center gap-4">
          <Link to="/" className="text-gray-900 hover:text-blue-600 transition-colors shrink-0">
            <span className="text-2xl sm:text-3xl font-bold">📚 Library System</span>
          </Link>
          
          <nav className="hidden md:flex gap-4 items-center flex-1 justify-end">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${getNavLinkClass(item.color)} font-medium text-sm`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 items-center pl-4 border-l border-gray-200">
              {user && (
                <Link
                  to="/profile"
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-2"
                >
                  <FiUser size={18} />
                  <span>{user.name || user.email}</span>
                </Link>
              )}
              {user ? (
                <button
                  onClick={onLogout}
                  className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-2"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
                >
                  <FiLogIn size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 shrink-0"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-3">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`${getNavLinkClass(item.color)} font-medium text-sm block`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-3 mt-2 flex flex-col gap-2">
                {user && (
                  <Link
                    to="/profile"
                    onClick={handleNavClick}
                    className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-2"
                  >
                    <FiUser size={18} />
                    {user.name || user.email}
                  </Link>
                )}
                {user ? (
                  <button
                    onClick={() => {
                      onLogout()
                      handleNavClick()
                    }}
                    className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-2 text-left"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleNavClick}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
                  >
                    <FiLogIn size={18} />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
