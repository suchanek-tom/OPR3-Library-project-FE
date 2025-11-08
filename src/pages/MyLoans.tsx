import { useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, UserRole } from '../types/User'
import { Loan, LoanStatus } from '../types/Loan'
import { getStatusBadge, formatDate } from '../utils/loanUtils'
import { fetchAllLoans, filterLoansByRole, returnLoan } from '../utils/loanApi'

const MyLoans: FC = () => {
  const navigate = useNavigate()
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)
  const [returning, setReturning] = useState<number | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (!user) return
    const loadLoans = async () => {
      try {
        setLoading(true)
        const allLoans = await fetchAllLoans()
        const filteredLoans = filterLoansByRole(allLoans, user.id, user.role)
        setLoans(filteredLoans)
        setError('')
      } catch (err) {
        setError('Failed to load loans')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadLoans()
  }, [user])

  const handleReturnLoan = async (loanId: number): Promise<void> => {
    if (!window.confirm('Are you sure you want to return this book?')) {
      return
    }

    setReturning(loanId)
    try {
      await returnLoan(loanId)
      setLoans(loans.map(loan => 
        loan.id === loanId 
          ? { ...loan, status: 'RETURNED' as LoanStatus }
          : loan
      ))
      alert('Book returned successfully!')
    } catch (err) {
      alert('Error returning book. Please try again.')
      console.error(err)
    } finally {
      setReturning(null)
    }
  }



  if (loading) {
    return <div className="text-center py-8">Loading your loans...</div>
  }

  const activeLoans = loans.filter(loan => loan.status === 'ACTIVE')
  const returnedLoans = loans.filter(loan => loan.status === 'RETURNED')

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {user?.role === UserRole.ROLE_ADMIN ? 'All Loans' : 'My Loans'}
      </h2>
      <p className="text-gray-600 mb-6">
        {user?.role === UserRole.ROLE_ADMIN 
          ? 'View all borrowed books from all users' 
          : 'View your borrowed books'}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Active Loans ({activeLoans.length})
        </h3>

        {activeLoans.length === 0 ? (
          <p className="text-gray-600">No active loans</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeLoans.map(loan => (
              <div
                key={loan.id}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-lg text-blue-900 mb-2">
                  {loan.book?.title || 'Unknown Book'}
                </h4>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Author:</span> {loan.book?.author || 'Unknown'}
                </p>
                {user?.role === UserRole.ROLE_ADMIN && loan.user && (
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Borrowed by:</span> {loan.user.name} ({loan.user.email})
                  </p>
                )}
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Borrowed:</span> {formatDate(loan.loanDate)}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm mb-4 ${getStatusBadge(loan.status)}`}>
                  {loan.status}
                </span>
                {user?.role !== UserRole.ROLE_ADMIN && (
                  <button
                    onClick={() => handleReturnLoan(loan.id)}
                    disabled={returning === loan.id}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    {returning === loan.id ? 'Returning...' : 'Return Book'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Returned Loans ({returnedLoans.length})
        </h3>

        {returnedLoans.length === 0 ? (
          <p className="text-gray-600">No returned loans</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {returnedLoans.map(loan => (
              <div
                key={loan.id}
                className="bg-green-50 border border-green-200 rounded-lg p-4 opacity-75"
              >
                <h4 className="font-semibold text-lg text-green-900 mb-2">
                  {loan.book?.title || 'Unknown Book'}
                </h4>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Author:</span> {loan.book?.author || 'Unknown'}
                </p>
                {user?.role === UserRole.ROLE_ADMIN && loan.user && (
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Borrowed by:</span> {loan.user.name} ({loan.user.email})
                  </p>
                )}
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Borrowed:</span> {formatDate(loan.loanDate)}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Returned:</span> {formatDate(loan.returnDate || loan.loanDate)}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${getStatusBadge(loan.status)}`}>
                  {loan.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => navigate('/books')}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Browse Books
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default MyLoans
