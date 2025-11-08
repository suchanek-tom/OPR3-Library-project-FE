type Props = {
  query: string
  onChange: (q: string) => void
  placeholder?: string
}

const BookSearch = ({ query, onChange, placeholder = 'Search by title...' }: Props) => {
  return (
    <div className="mb-4">
      <input
        aria-label="Search books by title"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 mr-2"
      />
      {query && (
        <button 
          onClick={() => onChange('')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition"
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default BookSearch
