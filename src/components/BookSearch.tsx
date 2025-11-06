type Props = {
  query: string
  onChange: (q: string) => void
  placeholder?: string
}

const BookSearch = ({ query, onChange, placeholder = 'Search by title...' }: Props) => {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        aria-label="Search books by title"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: '6px 8px', width: 260, marginRight: 8 }}
      />
      {query && (
        <button onClick={() => onChange('')}>Clear</button>
      )}
    </div>
  )
}

export default BookSearch
