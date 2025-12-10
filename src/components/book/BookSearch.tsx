type Props = {
  query: string
  onChange: (q: string) => void
  placeholder?: string
}

const BookSearch = ({ query, onChange, placeholder = 'Search by title...' }: Props) => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <input
        aria-label="Search books by title"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      {query && (
        <button 
          onClick={() => onChange('')}
          className="w-full sm:w-auto px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition"
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default BookSearch
