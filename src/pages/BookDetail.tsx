import { useEffect, useState, FC, SetStateAction } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../types/Book";
import { User, UserRole } from "../types/User";
import { Loan } from "../types/Loan";
import LoanButton from "../components/loan/LoanButton";
import ReturnButton from "../components/loan/ReturnButton";
import DeleteButton from "../components/book/DeleteButton";
import EditBook from "../components/book/EditBook";

const BookDetail: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userLoan, setUserLoan] = useState<Loan | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

  useEffect(() => {
    if (!user || !book) return;

    const checkUserLoan = async () => {
      try {
        const response = await fetch(`/api/loans`);
        if (!response.ok) throw new Error("Failed to load loans");

        const loans = await response.json();
        const activeLoan = loans.find(
          (loan: Loan) =>
            loan.user?.id === user.id &&
            loan.book?.id === book.id &&
            loan.status === "ACTIVE"
        );
        setUserLoan(activeLoan || null);
      } catch (err) {
        console.error("Failed to check user loans:", err);
      }
    };

    checkUserLoan();
  }, [user, book]);

  if (loading) return <p className="text-gray-500 text-center py-8">Loading...</p>;
  if (!book) return <p className="text-gray-500 text-center py-8">Book not found</p>;

  const handleBorrowSuccess = () => {
    if (id) {
      fetch(`/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => setBook(data));
    }
    if (user) {
      fetch(`/api/loans`)
        .then((res) => res.json())
        .then((loans) => {
          const activeLoan = loans.find(
            (loan: Loan) =>
              loan.user?.id === user.id &&
              loan.book?.id === book.id &&
              loan.status === "ACTIVE"
          );
          setUserLoan(activeLoan || null);
        });
    }
  };

  const handleReturnSuccess = () => {
    setUserLoan(null);
    if (id) {
      fetch(`/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => setBook(data));
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <button
        onClick={() => navigate("/books")}
        className="text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Back to Books
      </button>
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-semibold">Author:</span> {book.author}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">ISBN:</span> {book.isbn}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Year:</span> {book.publicationYear}
      </p>
      <p className="text-gray-700 mb-6">{book.content}</p>
      <div className="flex gap-4 items-center">
        {user?.role === UserRole.ROLE_ADMIN ? (
          <EditBook
            book={book}
            onSuccess={(updatedBook: SetStateAction<Book | null>) => setBook(updatedBook)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          />
        ) : userLoan ? (
          <ReturnButton 
            loanId={userLoan.id} 
            onSuccess={handleReturnSuccess} 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          />
        ) : book.available ? (
          <LoanButton 
            bookId={book.id} 
            onSuccess={handleBorrowSuccess} 
          />
        ) : (
          <p className="text-red-600 font-semibold">Book is not available</p>
        )}
        {user?.role === UserRole.ROLE_ADMIN && (
          <DeleteButton 
            bookId={book.id}
            bookTitle={book.title}
            onSuccess={() => navigate('/books')}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold py-2 px-4 rounded transition-colors"
          />
        )}
      </div>
    </div>
  );
};

export default BookDetail;
