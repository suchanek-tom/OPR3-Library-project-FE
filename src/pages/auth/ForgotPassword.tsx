import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/form/ErrorMessage'
import SuccessMessage from '../../components/form/SuccessMessage'

interface ForgotPasswordFormInputs {
  email: string
}

const ForgotPassword: FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormInputs>()
  const [apiError, setApiError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setApiError('')
    setSuccessMessage('')

    try {
      const response = await fetch('http://localhost:8080/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to send reset email')
      }

      setSuccessMessage('Password reset link has been sent to your email. Please check your inbox.')
    } catch (err: any) {
      setApiError(err.message || 'Failed to process request. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">🔒 Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {apiError && <ErrorMessage message={apiError} />}
          {successMessage && <SuccessMessage message={successMessage} />}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
