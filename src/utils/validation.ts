interface RegisterFormData {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
  address: string
  city: string
}

export const validateRegisterForm = (formData: RegisterFormData): string | null => {
  if (!formData.name.trim()) {
    return 'First name is required'
  }
  if (!formData.surname.trim()) {
    return 'Last name is required'
  }
  if (!formData.email.trim()) {
    return 'Email is required'
  }
  if (!formData.email.includes('@')) {
    return 'Please enter a valid email'
  }
  if (formData.password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  if (formData.password !== formData.confirmPassword) {
    return 'Passwords do not match'
  }
  if (!formData.address.trim()) {
    return 'Address is required'
  }
  if (!formData.city.trim()) {
    return 'City is required'
  }
  return null
}

export type { RegisterFormData }
