/**
 * Get authorization headers with JWT token
 * @returns Headers object with Authorization header if token exists
 */
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}
