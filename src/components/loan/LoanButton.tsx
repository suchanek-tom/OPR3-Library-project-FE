import { useState, FC } from 'react'
import { Book } from '../../types/Book'
import { getAuthHeaders } from '../../utils/authHeaders'

interface LoanButtonProps {
  bookId: string | number
  onSuccess?: (updated?: Book) => void
  className?: string
}

const LoanButton: FC<LoanButtonProps> = ({ bookId, onSuccess, className }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleClick = async (): Promise<void> => {
    setLoading(true)
    setMessage(null)
    setMessage(null)

    try {

      const userStr = localStorage.getItem('user')
      if (!userStr) {
        throw new Error('User not logged in')
      }

      const user = JSON.parse(userStr)
      const userId = user.id

      const res = await fetch(`http://localhost:8080/api/loans/borrow`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          user: { id: userId },
          book: { id: Number(bookId) },
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${res.statusText}`)
      }

      await res.json()
      setMessage('📖 Book borrowed successfully!')
      setMessage('success')
      
      if (onSuccess) {
        onSuccess()
      }

      setTimeout(() => setMessage(null), 3000)
    } catch (err: any) {
      console.error('Borrow error:', err)
      const errorMsg = err?.message ?? 'Failed to borrow book'
      setMessage(errorMsg)
      setMessage('error')
    } finally {
      setLoading(false)
    }
  }

  const messageColor = message === 'success' 
    ? 'text-green-700 bg-green-50 border border-green-200' 
    : 'text-red-700 bg-red-50 border border-red-200'

  return (
    <div>
      <button 
        onClick={handleClick} 
        disabled={loading} 
        className={className || "w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"}
      >
        {loading ? '⏳ Borrowing...' : '📖 Borrow Book'}
      </button>
      {message && (
        <p className={`mt-2 text-sm font-medium px-3 py-2 rounded-lg ${messageColor}`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default LoanButton
