import React, { createContext, useState, useEffect, useContext } from 'react'
import type { ReactNode } from 'react'
import { authService } from '../services/authService'
import type { User, LoginCredentials, RegisterData, ApiError } from '../types/auth'
import { AxiosError } from 'axios'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const userData = await authService.getProfile()
        setUser(userData)
      } catch (err) {
        console.error('Failed to load user', err)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setError(null)
    try {
      const data = await authService.login(credentials)
      const { token, user } = data
      localStorage.setItem('token', token)
      setUser(user)
      return { success: true }
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>
      const message = axiosError.response?.data?.message || 'Login failed'
      setError(message)
      return { success: false, error: message }
    }
  }

  const register = async (userData: RegisterData) => {
    setError(null)
    try {
      const data = await authService.register(userData)
      const { token, user } = data
      localStorage.setItem('token', token)
      setUser(user)
      return { success: true }
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>
      const message = axiosError.response?.data?.message || 'Registration failed'
      setError(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error', err)
    } finally {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}