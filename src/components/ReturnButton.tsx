import { useState, FC } from 'react'

interface ReturnButtonProps {
  loanId: number
  onSuccess?: () => void
  className?: string
}

const ReturnButton: FC<ReturnButtonProps> = ({ loanId, onSuccess, className }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null)

  const handleClick = async (): Promise<void> => {
    if (!window.confirm('Are you sure you want to return this book?')) {
      return
    }

    setLoading(true)
    setMessage(null)
    setMessageType(null)

    try {
      const res = await fetch(`/api/loans/return/${loanId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${res.statusText}`)
      }

      await res.json()
      setMessage('✅ Book returned successfully!')
      setMessageType('success')

      if (onSuccess) {
        onSuccess()
      }

      setTimeout(() => setMessage(null), 3000)
    } catch (err: any) {
      console.error('Return error:', err)
      const errorMsg = err?.message ?? 'Failed to return book'
      setMessage(errorMsg)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const messageColor = messageType === 'success'
    ? 'text-green-700 bg-green-50 border border-green-200'
    : 'text-red-700 bg-red-50 border border-red-200'

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={className || "w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"}
      >
        {loading ? '⏳ Returning...' : '↩️ Return Book'}
      </button>
      {message && (
        <p className={`mt-2 text-sm font-medium px-3 py-2 rounded-lg ${messageColor}`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default ReturnButton
