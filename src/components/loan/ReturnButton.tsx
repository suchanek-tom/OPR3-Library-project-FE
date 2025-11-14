import { useState, FC } from 'react'
import { getAuthHeaders } from '../../utils/authHeaders'
import Modal from '../Modal'
import Toast from '../Toast'

interface ReturnButtonProps {
  loanId: number
  onSuccess?: () => void
  className?: string
}

const ReturnButton: FC<ReturnButtonProps> = ({ loanId, onSuccess, className }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [showToast, setShowToast] = useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

  const handleClick = async (): Promise<void> => {
    setConfirmModalOpen(true)
  }

  const handleConfirmReturn = async (): Promise<void> => {
    setConfirmModalOpen(false)
    setLoading(true)

    try {
      const res = await fetch(`http://localhost:8080/api/loans/return/${loanId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${res.statusText}`)
      }

      await res.json()
      setToastMessage('Book returned successfully!')
      setToastType('success')
      setShowToast(true)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      console.error('Return error:', err)
      const errorMsg = err?.message ?? 'Failed to return book'
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
        className={className || "w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"}
      >
        {loading ? '⏳ Returning...' : '↩️ Return Book'}
      </button>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      <Modal
        isOpen={confirmModalOpen}
        title="Confirm Return"
        onConfirm={handleConfirmReturn}
        onCancel={() => setConfirmModalOpen(false)}
        confirmText="Yes, Return Book"
        cancelText="Cancel"
        isDangerous={true}
      >
        Are you sure you want to return this book?
      </Modal>
    </div>
  )
}

export default ReturnButton
