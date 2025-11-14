import { FC, useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}

const Toast: FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const bgColor = type === 'success'
    ? 'bg-green-500'
    : 'bg-red-500'

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-pulse`}>
      <span className="text-lg">
        {type === 'success' ? '✅' : '❌'}
      </span>
      <span>{message}</span>
    </div>
  )
}

export default Toast
