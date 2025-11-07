import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome</h2>
      <p className="text-gray-600 text-lg">Welcome to the Library System. Use the navigation to view books and explore our collection.</p>
    </div>
  )
}

export default Home
