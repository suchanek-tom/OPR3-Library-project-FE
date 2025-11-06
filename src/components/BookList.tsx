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
        // pokud backend vrací stránkování (Page), bereme content
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

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📚 Library Books</h2>

      <BookSearch query={query} onChange={setQuery} />

      {filtered.length === 0 ? (
        <p>No books found for "{query}"</p>
      ) : (
        <ul>
          {filtered.map((b) => (
            <li key={b.id}>
              <Link to={`/books/${b.id}`} style={{ textDecoration: 'none' }}>
                <strong>{b.title}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
