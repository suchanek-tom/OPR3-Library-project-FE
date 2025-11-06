import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📚 Library Books</h2>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            <Link to={`/books/${b.id}`} style={{ textDecoration: 'none' }}>
              <strong>{b.title}</strong>
            </Link>
            {" "}
            {b.authors && b.authors.length > 0 && (
              <span>— {b.authors.map(a => a.name).join(", ")}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
