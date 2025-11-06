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

  if (loading) return <p className="text-gray-500 text-center py-8">Loading...</p>;
  if (!book) return <p className="text-gray-500 text-center py-8">Book not found</p>;

 
  const handleBorrowSuccess = (data?: Book) => {
    if (data) setBook(data)
    else setBook((prev) => (prev ? { ...prev, available: false } : prev))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h2>
      
      <div className="space-y-2 mb-6 text-gray-700">
        {book.author && <p><span className="font-semibold">Author:</span> {book.author}</p>}
        {(book as any).content && <p className="mt-4"><span className="font-semibold">Description:</span> {(book as any).content}</p>}
        {(book as any).publicationYear && <p><span className="font-semibold">Publication Year:</span> {(book as any).publicationYear}</p>}
        {(book as any).isbn && <p><span className="font-semibold">ISBN:</span> {(book as any).isbn}</p>}
      </div>

      {book.available ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700 font-medium mb-3">Status: Available</p>
          <LoanButton bookId={String(id)} onSuccess={handleBorrowSuccess} />
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-medium">Status: Unavailable</p>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
