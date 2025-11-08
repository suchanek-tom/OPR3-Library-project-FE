import { User } from '../types/User'
import { Loan } from '../types/Loan'

/**
 * Fetch all users from the API
 * @returns Array of all users
 * @throws Error if the API call fails
 */
export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await fetch('http://localhost:8080/api/users')

  if (!response.ok) {
    throw new Error('Failed to load users')
  }

  const data = await response.json()
  return Array.isArray(data) ? data : []
}

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
  return Array.isArray(data) ? data : []
}

/**
 * Calculate loan statistics for a user
 * @param userId - The user ID
 * @param loans - Array of all loans
 * @returns Object with borrowed and returned counts
 */
export const getUserLoanStats = (userId: number, loans: Loan[]) => {
  const userLoans = loans.filter(loan => loan.user?.id === userId)
  
  const borrowed = userLoans.filter(loan => loan.status === 'ACTIVE').length
  const returned = userLoans.filter(loan => loan.status === 'RETURNED').length

  return {
    borrowed,
    returned,
    total: borrowed + returned,
  }
}

/**
 * Get formatted user info with loan statistics
 * @param users - Array of all users
 * @param loans - Array of all loans
 * @returns Array of users with loan statistics
 */
export const getUsersWithStats = (users: User[], loans: Loan[]) => {
  return users.map(user => ({
    ...user,
    loanStats: getUserLoanStats(user.id, loans),
  }))
}
