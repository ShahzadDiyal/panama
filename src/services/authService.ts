// authService.ts
import api from './api'
import type {   LoginCredentials, RegisterData, User } from '../types/auth'

export const authService = {
  register: async (userData: RegisterData): Promise<{ user: User; token: string }> => {
    const payload = {
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email,
      password: userData.password,
    }
    const response = await api.post('/user/auth/register', payload)
    // response.data = { success, message, data: { user, token } }
    return response.data.data // return { user, token }
  },

  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post('/user/auth/login', credentials)
    return response.data.data // return { user, token }
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/auth/me')
    return response.data.data // return user object
  },

  logout: async (): Promise<{ success: boolean }> => {
    const response = await api.post('/user/auth/logout')
    return response.data
  },
}