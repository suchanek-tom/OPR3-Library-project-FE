import { LoanStatus } from '../types/Loan'

/**
 * Get the appropriate CSS classes for loan status badge
 * @param status - The loan status (ACTIVE or RETURNED)
 * @returns CSS classes for styling the badge
 */
export const getStatusBadge = (status: LoanStatus | string): string => {
  if (status === 'ACTIVE') {
    return 'bg-yellow-100 text-yellow-800'
  } else {
    return 'bg-green-100 text-green-800'
  }
}

/**
 * Format a date string to a readable format
 * @param dateString - The date string to format
 * @returns Formatted date string (e.g., "Nov 8, 2025")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
