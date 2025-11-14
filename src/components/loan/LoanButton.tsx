import { useState, FC } from 'react'
import { Book } from '../../types/Book'
import { getAuthHeaders } from '../../utils/authHeaders'
import Toast from '../Toast'

interface LoanButtonProps {
  bookId: string | number
  onSuccess?: (updated?: Book) => void
  className?: string
}

const LoanButton: FC<LoanButtonProps> = ({ bookId, onSuccess, className }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [showToast, setShowToast] = useState<boolean>(false)

  const handleClick = async (): Promise<void> => {
    setLoading(true)

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
          userId,
          bookId: Number(bookId),
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${res.statusText}`)
      }

      await res.json()
      setToastMessage('Book borrowed successfully!')
      setToastType('success')
      setShowToast(true)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      console.error('Borrow error:', err)
      const errorMsg = err?.message ?? 'Failed to borrow book'
      setToastMessage(errorMsg)
      setToastType('error')
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button 
        onClick={handleClick} 
        disabled={loading} 
        className={className || "w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"}
      >
        {loading ? '⏳ Borrowing...' : '📖 Borrow Book'}
      </button>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

export default LoanButton
