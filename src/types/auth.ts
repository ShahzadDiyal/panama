export interface User {
  id: number
  name: string
  email: string
  role?: 'buyer' | 'supplier'
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  role?: 'buyer' | 'supplier'
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}