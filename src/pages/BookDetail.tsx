import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../types/Book";
import LoanButton from "../components/LoanButton";

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

 
  const handleBorrowSuccess = (data?: Book) => {
    if (data) setBook(data)
    else setBook((prev) => (prev ? { ...prev, available: false } : prev))
  }

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>← Back</button>
      <h2>{book.title}</h2>
      {book.author && <p>By: {book.author}</p>}
      {book.content && <p>{book.content}</p>}
      {book.publicationYear && <p>Publication Year: {book.publicationYear}</p>}
      {book.isbn && <p>ISBN: {book.isbn}</p>}

      {book.available ? (
        <div>
          <p>Status: Available</p>
          <LoanButton bookId={String(id)} onSuccess={handleBorrowSuccess} />
        </div>
      ) : (
        <p>Status: Unavailable</p>
      )}
    </div>
  );
};

export default BookDetail;
