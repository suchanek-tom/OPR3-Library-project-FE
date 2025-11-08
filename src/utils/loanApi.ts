import { Loan } from '../types/Loan'
import { UserRole } from '../types/User'

/**
 * Fetch all loans from the API
 * @returns Array of all loans
 * @throws Error if the API call fails
 */
export const fetchAllLoans = async (): Promise<Loan[]> => {
  const response = await fetch('http://localhost:8080/api/loans')
  
  if (!response.ok) {
    throw new Error('Failed to load loans')
  }

  const data = await response.json()
  return Array.isArray(data) ? data : data.content || []
}

/**
 * Filter loans based on user role
 * Admins see all loans, regular users see only their own
 * @param loans - Array of all loans
 * @param userId - Current user's ID
 * @param userRole - Current user's role
 * @returns Filtered loans based on user role
 */
export const filterLoansByRole = (
  loans: Loan[],
  userId: number,
  userRole: UserRole
): Loan[] => {
  return userRole === UserRole.ROLE_ADMIN
    ? loans
    : loans.filter((loan: Loan) => loan.user?.id === userId)
}

/**
 * Return a borrowed book
 * @param loanId - The ID of the loan to return
 * @returns Promise that resolves if successful
 * @throws Error if the API call fails
 */
export const returnLoan = async (loanId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/loans/return/${loanId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to return loan')
  }
}
