import { useEffect, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User } from '../types/User'
import { BookFormData } from '../types/Book'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'

const AddBook: FC = () => {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [apiError, setApiError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookFormData>({
    defaultValues: {
      title: '',
      author: '',
      isbn: '',
      publicationYear: new Date().getFullYear(),
      available: true,
      content: '',
    },
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const parsedUser: User = JSON.parse(user)
      if (parsedUser.role === 'ROLE_ADMIN') {
        setIsAuthorized(true)
      }
    }
    setLoading(false)
  }, [])

  const onSubmit = async (data: BookFormData) => {
    setApiError('')
    setSuccess('')

    try {
      const response = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add book')
      }

      setSuccess('Book added successfully!')
      reset()

      setTimeout(() => navigate('/books'), 2000)
    } catch (err: any) {
      setApiError(err.message || 'Failed to add book. Please try again.')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!isAuthorized) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Access Denied</h2>
        <p className="text-red-600 mb-6">You must be an admin to add new books.</p>
        <button
          onClick={() => navigate('/books')}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Go Back to Books
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters',
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter book title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author *
          </label>
          <input
            id="author"
            type="text"
            {...register('author', {
              required: 'Author is required',
              minLength: {
                value: 2,
                message: 'Author must be at least 2 characters',
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
            ISBN
          </label>
          <input
            id="isbn"
            type="text"
            {...register('isbn', {
              minLength: {
                value: 10,
                message: 'ISBN must be at least 10 characters',
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter ISBN number"
          />
          {errors.isbn && (
            <p className="text-red-600 text-sm mt-1">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700 mb-1">
            Publication Year *
          </label>
          <input
            id="publicationYear"
            type="number"
            {...register('publicationYear', {
              required: 'Publication year is required',
              min: {
                value: 1000,
                message: 'Year must be 1000 or later',
              },
              max: {
                value: new Date().getFullYear(),
                message: `Year cannot be in the future`,
              },
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter publication year"
          />
          {errors.publicationYear && (
            <p className="text-red-600 text-sm mt-1">{errors.publicationYear.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Description/Content
          </label>
          <textarea
            id="content"
            {...register('content', {
              maxLength: {
                value: 10000,
                message: 'Content must not exceed 10000 characters',
              },
            })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="Enter book description or content"
          />
          {errors.content && (
            <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="available"
            type="checkbox"
            {...register('available')}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="available" className="ml-2 text-sm font-medium text-gray-700">
            Book is available for borrowing
          </label>
        </div>

        {apiError && <ErrorMessage message={apiError} />}

        {success && <SuccessMessage message={success} />}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Adding Book...' : 'Add Book'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/books')}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBook
