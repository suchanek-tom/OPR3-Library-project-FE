import { useState, useEffect, FC, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/User'

interface BookFormData {
  title: string
  author: string
  isbn: string
  publicationYear: number
  available: boolean
  content: string
}

const AddBook: FC = () => {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    publicationYear: new Date().getFullYear(),
    available: true,
    content: '',
  })
  const [formLoading, setFormLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setFormLoading(true)

    try {
      const response = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add book')
      }

      setSuccess('Book added successfully!')
      setFormData({
        title: '',
        author: '',
        isbn: '',
        publicationYear: new Date().getFullYear(),
        available: true,
        content: '',
      })

      setTimeout(() => navigate('/books'), 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to add book. Please try again.')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter book title"
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author *
          </label>
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter author name"
          />
        </div>

        {/* ISBN */}
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
            ISBN
          </label>
          <input
            id="isbn"
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter ISBN number"
          />
        </div>

        {/* Publication Year */}
        <div>
          <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700 mb-1">
            Publication Year *
          </label>
          <input
            id="publicationYear"
            type="number"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            required
            min="1000"
            max={new Date().getFullYear()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter publication year"
          />
        </div>

        {/* Content/Description */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Description/Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="Enter book description or content"
          />
        </div>

        {/* Available Checkbox */}
        <div className="flex items-center">
          <input
            id="available"
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="available" className="ml-2 text-sm font-medium text-gray-700">
            Book is available for borrowing
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={formLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {formLoading ? 'Adding Book...' : 'Add Book'}
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
