import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../types/Book";
import { User } from "../../types/User";
import { getAuthHeaders } from "../../utils/authHeaders";
import BookSearch from "./BookSearch";
import DeleteButton from "./DeleteButton";
import AvailabilityBadge from "./AvailabilityBadge";


export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/books", {
      headers: getAuthHeaders(),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load books");
        return res.json();
      })
      .then(data => {
        const bookList = Array.isArray(data) ? data : data.content ?? [];
        setBooks(bookList);
      })
      .catch(err => {
        console.error("Error loading books:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = books;
    if (q) {
      result = result.filter((b) => (b.title ?? "").toLowerCase().includes(q));
    }
    if (showOnlyAvailable) {
      result = result.filter((b) => b.available === true);
    }
    
    return result;
  }, [books, query, showOnlyAvailable]);

  if (loading) return <p className="text-gray-500 text-center py-8">Loading...</p>;

  const isAdmin = user && user.role === 'ROLE_ADMIN';

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Library Books</h2>

      <div className="flex gap-4 items-center mb-6">
        <BookSearch query={query} onChange={setQuery} />
        <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => setShowOnlyAvailable(e.target.checked)}
            className="w-4 h-4 rounded accent-green-600 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700">Show only available</span>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No books found for "{query}"</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
          {filtered.map((b) => (
            <Link 
              key={b.id}
              to={`/books/${b.id}`} 
              className="no-underline"
            >
              <li 
                className="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer h-full relative border-gray-300"
              >
                <h3 className="font-semibold text-blue-600 hover:text-blue-800 text-lg">{b.title}</h3>
                <AvailabilityBadge available={b.available} />
                {(b as any).authors && (b as any).authors.length > 0 && (
                  <p className="text-gray-600 text-sm mt-2">By: {(b as any).authors.map((a: any) => a.name).join(", ")}</p>
                )}
                {isAdmin && (
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <DeleteButton
                      bookId={b.id}
                      bookTitle={b.title}
                      onSuccess={() => setBooks(books.filter(book => book.id !== b.id))}
                      showMessage={false}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded transition-colors flex items-center gap-2"
                    />
                  </div>
                )}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
