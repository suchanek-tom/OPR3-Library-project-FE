import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../types/Book";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return setLoading(false);
    fetch(`/api/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load book");
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => {
        console.error(err);
        setBook(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: '1rem' }}>Loading...</p>;
  if (!book) return <p style={{ padding: '1rem' }}>Book not found</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>← Back</button>
      <h2>{book.title}</h2>
      {book.available ? <p>Status: Available</p> : <p>Status: Unavailable</p>}
      {book.authors && book.authors.length > 0 && (
        <p>By: {book.authors.map((a) => a.name).join(", ")}</p>
      )}
  {(book as any).description && <p>{(book as any).description}</p>}
      {/* render other fields if available */}
    </div>
  );
};

export default BookDetail;
