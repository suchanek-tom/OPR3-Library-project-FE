import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";
import BookSearch from "./BookSearch";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/books")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load books");
        return res.json();
      })
      .then(data => {
        setBooks(data.content ?? data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => (b.title ?? "").toLowerCase().includes(q));
  }, [books, query]);

  if (loading) return <p className="text-gray-500 text-center py-8">Loading...</p>;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Library Books</h2>

      <BookSearch query={query} onChange={setQuery} />

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
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer h-full"
              >
                <h3 className="font-semibold text-blue-600 hover:text-blue-800 text-lg">{b.title}</h3>
                {(b as any).authors && (b as any).authors.length > 0 && (
                  <p className="text-gray-600 text-sm mt-2">By: {(b as any).authors.map((a: any) => a.name).join(", ")}</p>
                )}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
