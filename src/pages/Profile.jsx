import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">No User Data</h2>
        <p className="text-red-600 mb-6">User information not found.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Go Back
        </button>
      </div>
    )
  }

  const getRoleBadgeColor = (role) => {
    return role === 'ROLE_ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
        <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getRoleBadgeColor(user.role)}`}>
          {user.role === 'ROLE_ADMIN' ? '🔑 Admin' : '👥 User'}
        </span>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">First Name</label>
              <p className="text-lg text-gray-900 mt-1">{user.name || 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Last Name</label>
              <p className="text-lg text-gray-900 mt-1">{user.surname || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg text-gray-900 mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Street Address</label>
              <p className="text-lg text-gray-900 mt-1">{user.address || 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">City</label>
              <p className="text-lg text-gray-900 mt-1">{user.city || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <label className="text-sm font-medium text-blue-600">Account Role</label>
          <p className="text-lg text-gray-900 mt-1">
            {user.role === 'ROLE_ADMIN' 
              ? '🔐 Administrator - Full access to all features' 
              : '👥 Regular User - Standard library access'}
          </p>
        </div>

          <button
            onClick={() => navigate('/')}
            className=" bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors w-full"
          >
            Back to Home
          </button>
      </div>
    </div>
  )
}

export default Profile
