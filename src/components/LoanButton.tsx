import { useState } from 'react'
import { Book } from '../types/Book'

type Props = {
  bookId: string
  onSuccess?: (updated?: Book) => void
  className?: string
}

const LoanButton = ({ bookId, onSuccess, className }: Props) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch(`/api/books/${bookId}/loan`, { method: 'POST' })
      if (!res.ok) {
        const text = await res.text().catch(() => 'Failed to borrow')
        throw new Error(text || 'Failed to borrow')
      }
      const data = await res.json().catch(() => null)
      setMessage('Book borrowed successfully')
      if (onSuccess) onSuccess(data ?? undefined)
    } catch (err: any) {
      console.error(err)
      setMessage(err?.message ?? 'Failed to borrow book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button 
        onClick={handleClick} 
        disabled={loading} 
        className={className || "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"}
      >
        {loading ? 'Processing…' : 'Borrow'}
      </button>
      {message && <p className="mt-2 text-sm font-medium text-gray-700">{message}</p>}
    </div>
  )
}

export default LoanButton
