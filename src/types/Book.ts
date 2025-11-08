export interface Book {
  id: number;
  title: string;
  isbn: string;
  content: string;
  publicationYear: number;
  available: boolean;
  author: string;
}

export interface BookFormData {
  title: string
  author: string
  isbn: string
  publicationYear: number
  available: boolean
  content: string
}

export interface EditBookProps {
  book: Book;
  onSuccess: (updatedBook: Book) => void;
  className?: string;
}

export interface AvailabilityBadgeProps {
  available: boolean;
  className?: string;
}

export interface AvailabilityFilterProps extends AvailabilityBadgeProps {
  onClick: () => void;
  isActive: boolean;
}

export interface DeleteButtonProps {
  bookId: number;
  bookTitle?: string;
  onSuccess?: () => void;
  className?: string;
  showMessage?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}