import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAllUsers, fetchAllLoans, getUsersWithStats } from '../utils/userApi'
import { StatCard, UserWithStats } from '../types/User'
import { LoanBadge } from '../types/Loan'
import { TableHeader } from '../types/Table'

const AdminUsers = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const checkAdminAccess = () => {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : null
    if (!user || user.role !== 'ROLE_ADMIN') {
      navigate(user ? '/' : '/login')
    }
  }

  useEffect(() => {
    checkAdminAccess()
  }, [navigate])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [allUsers, allLoans] = await Promise.all([
          fetchAllUsers(),
          fetchAllLoans(),
        ])

        const usersWithStats = getUsersWithStats(allUsers, allLoans)
        setUsers(usersWithStats)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase()
    return [user.name, user.surname, user.email].some(field =>
      field.toLowerCase().includes(searchLower)
    )
  })

  const statCards: StatCard[] = [
    { label: 'Total Users', value: users.length, color: 'blue' },
    { label: 'Active Loans', value: users.reduce((sum, u) => sum + u.loanStats.borrowed, 0), color: 'orange' },
    { label: 'Returned Loans', value: users.reduce((sum, u) => sum + u.loanStats.returned, 0), color: 'green' },
    { label: 'Total Loans', value: users.reduce((sum, u) => sum + u.loanStats.total, 0), color: 'purple' },
  ]

  const loanBadges: LoanBadge[] = [
    { key: 'borrowed', label: 'Borrowed', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
    { key: 'returned', label: 'Returned', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    { key: 'total', label: 'Total', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
  ]

  const tableHeaders: TableHeader[] = [
    { label: 'Name', align: 'left' },
    { label: 'Email', align: 'left' },
    { label: 'City', align: 'left' },
    { label: 'Role', align: 'left' },
    ...loanBadges.map(badge => ({ label: badge.label, align: 'center' as const })),
  ]

  const renderStatCard = (card: StatCard) => (
    <div key={card.label} className="bg-white rounded-lg shadow p-6">
      <div className="text-gray-500 text-sm">{card.label}</div>
      <div className={`text-3xl font-bold text-${card.color}-600`}>{card.value}</div>
    </div>
  )

  const renderTableHeader = (header: TableHeader) => (
    <th
      key={header.label}
      className={`px-6 py-3 text-${header.align} text-xs font-medium text-gray-500 uppercase tracking-wider`}
    >
      {header.label}
    </th>
  )

  const renderLoanBadge = (badge: LoanBadge, value: number) => (
    <td key={badge.key} className="px-6 py-4 whitespace-nowrap text-center">
      <span className={`px-3 py-1 ${badge.bgColor} ${badge.textColor} text-sm font-medium rounded`}>
        {value}
      </span>
    </td>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel - Users</h1>
        <p className="text-gray-600">Manage all users and track their library activity</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map(renderStatCard)}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <input
          type="text"
          placeholder="Search by name, surname, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map(renderTableHeader)}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name} {user.surname}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    user.role === 'ROLE_ADMIN'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'ROLE_ADMIN' ? '🔐 Admin' : '👤 User'}
                  </span>
                </td>
                {loanBadges.map(badge => renderLoanBadge(badge, user.loanStats[badge.key]))}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">ℹ️ Information</h3>
        <ul className="text-blue-800 space-y-1">
          <li>• <strong>Borrowed:</strong> Number of active (not yet returned) loans</li>
          <li>• <strong>Returned:</strong> Number of completed loans</li>
          <li>• <strong>Total:</strong> Total number of loans (borrowed + returned)</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminUsers
