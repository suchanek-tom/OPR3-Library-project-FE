export enum LoanStatus {
  ACTIVE = 'ACTIVE',
  RETURNED = 'RETURNED',
}

export interface Loan {
  id: number
  userId: number
  bookId: number
  loanDate: string
  returnDate?: string
  status: LoanStatus
  book?: {
    id: number
    title: string
    author: string
  }
  user?: {
    id: number
    name: string
    email: string
  }
}

export interface BorrowRequest {
  bookId: number
  userId: number
}

export interface ReturnLoanRequest {
  loanId: number
}
