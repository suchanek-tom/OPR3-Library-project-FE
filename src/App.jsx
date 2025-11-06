import { Outlet, Link } from 'react-router-dom'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">📚 Library System</h1>
          <nav className="flex gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Home</Link>
            <span className="text-gray-300">|</span>
            <Link to="/books" className="text-blue-600 hover:text-blue-800 font-medium">Books</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App