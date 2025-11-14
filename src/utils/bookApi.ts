import { Book } from '../types/Book'
import { getAuthHeaders } from './authHeaders'

/**
 * Fetch a single book by ID
 * @param bookId - The ID of the book to fetch
 * @returns The book data
 * @throws Error if the API call fails
 */
export const fetchBook = async (bookId: string): Promise<Book> => {
  const response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to load book")
  return response.json()
}

/**
 * Update a book's details
 * @param bookId - The ID of the book to update
 * @param bookData - The updated book data
 * @throws Error if the API call fails
 */
export const updateBook = async (bookId: number, bookData: Partial<Book>): Promise<Book> => {
  const response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(bookData),
  })
  if (!response.ok) throw new Error("Failed to update book")
  return response.json()
}

/**
 * Fetch all loans to check for active loans on a book
 * @returns Array of all loans
 * @throws Error if the API call fails
 */
export const fetchAllLoans = async () => {
  const response = await fetch(`http://localhost:8080/api/loans`, {
    headers: getAuthHeaders(),
  })
  if (!response.ok) throw new Error("Failed to load loans")
  return response.json()
}
