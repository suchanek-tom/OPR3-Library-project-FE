import { useState, FC } from "react";
import Modal from "../Modal";

interface DeleteButtonProps {
  bookId: number;
  bookTitle?: string;
  onSuccess?: () => void;
  className?: string;
  showMessage?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ 
  bookId, 
  bookTitle = "this book",
  onSuccess, 
  className,
  showMessage = true,
  onClick 
}) => {
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    setDeleting(true);
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      if (showMessage) {
        setMessage({ text: '✅ Book deleted successfully!', type: 'success' });
      }
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      } else if (showMessage) {
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      if (showMessage) {
        setMessage({
          text: `❌ ${err instanceof Error ? err.message : 'Failed to delete book'}`,
          type: 'error',
        });
        setTimeout(() => setMessage(null), 3000);
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteButtonClick}
        disabled={deleting}
        className={className || "bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-bold py-2 px-4 rounded transition-colors"}
      >
        {deleting ? '🗑️' : '🗑️'}
      </button>
      <Modal
        isOpen={showModal}
        title="Delete Book"
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowModal(false)}
      >
        <p>Are you sure you want to delete <strong>"{bookTitle}"</strong>?</p>
        <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
      </Modal>
      {showMessage && message && (
        <p className={`mt-2 font-semibold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default DeleteButton;
