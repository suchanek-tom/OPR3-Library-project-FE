import { FC } from 'react'

interface SuccessMessageProps {
  message: string
}

const SuccessMessage: FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
      {message}
    </div>
  )
}

export default SuccessMessage
