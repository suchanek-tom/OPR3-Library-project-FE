interface RegisterFormData {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
  address: string
  city: string
}

/**
 * Sanitizes input to prevent XSS attacks
 * Removes potentially dangerous HTML/JavaScript
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return ''
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
}

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates password strength
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6
}

export const validateRegisterForm = (formData: RegisterFormData): string | null => {
  const name = sanitizeInput(formData.name)
  const surname = sanitizeInput(formData.surname)
  const email = sanitizeInput(formData.email)
  const address = sanitizeInput(formData.address)
  const city = sanitizeInput(formData.city)

  if (!name) {
    return 'First name is required'
  }
  if (name.length < 2) {
    return 'First name must be at least 2 characters'
  }
  if (!surname) {
    return 'Last name is required'
  }
  if (surname.length < 2) {
    return 'Last name must be at least 2 characters'
  }
  if (!email) {
    return 'Email is required'
  }
  if (!isValidEmail(email)) {
    return 'Please enter a valid email'
  }
  if (!isValidPassword(formData.password)) {
    return 'Password must be at least 6 characters'
  }
  if (formData.password !== formData.confirmPassword) {
    return 'Passwords do not match'
  }
  if (!address) {
    return 'Address is required'
  }
  if (address.length < 5) {
    return 'Address must be at least 5 characters'
  }
  if (!city) {
    return 'City is required'
  }
  if (city.length < 2) {
    return 'City must be at least 2 characters'
  }
  return null
}

export type { RegisterFormData }
