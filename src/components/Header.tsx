import { Link } from 'react-router-dom'
import { FiUser, FiLogOut, FiLogIn } from 'react-icons/fi'
import { HeaderProps, NavItem } from '../types/Header'

const Header = ({ user, onLogout }: HeaderProps) => {

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

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-3xl font-bold text-gray-900">📚 Library System</h1>
          <div className="flex gap-4 items-center">
            {user && (
              <Link
                to="/profile"
                className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-2"
              >
                <FiUser size={18} />
                {user.name || user.email}
              </Link>
            )}
            {user ? (
              <button
                onClick={onLogout}
                className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-2"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
              >
                <FiLogIn size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
        <nav className="flex gap-4 flex-wrap">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${getNavLinkClass(item.color)} font-medium`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
