import React, { createContext, useState, useEffect, useContext } from 'react'
import type { ReactNode } from 'react'
import { authService } from '../services/authService'
import { subscriptionService } from '../services/subscriptionService'
import type { User, LoginCredentials, RegisterData, ApiError } from '../types/auth'
import type { Subscription } from '../types'
import { AxiosError } from 'axios'

// Helper function to check if subscription is valid (active and not expired)
const isSubscriptionValid = (subscription: Subscription | null): boolean => {
  if (!subscription) return false;
  if (subscription.status !== 'active') return false;
  
  // Check if expires_at exists and is not expired
  if (subscription.expires_at) {
    const expiryDate = new Date(subscription.expires_at);
    const now = new Date();
    return expiryDate > now;
  }
  
  // If no expires_at field, check current_period_end if available
  if (subscription.current_period_end) {
    const periodEndDate = new Date(subscription.current_period_end);
    const now = new Date();
    return periodEndDate > now;
  }
  
  // If no expiration fields, fall back to status only
  return true;
};

interface AuthContextType {
    user: User | null
    loading: boolean
    error: string | null
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
    register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
    logout: () => Promise<void>
    // Subscription properties
    subscription: Subscription | null
    hasValidSubscription: boolean // New computed property
    loadingSubscription: boolean
    refreshSubscription: () => Promise<void>
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
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [loadingSubscription, setLoadingSubscription] = useState<boolean>(true)

    // Computed property for valid subscription
    const hasValidSubscription = isSubscriptionValid(subscription);

    // Load user on mount if token exists
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                setLoadingSubscription(false)
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

    // Fetch subscription when user changes
    const fetchSubscription = async () => {
        if (!user) {
            setSubscription(null)
            setLoadingSubscription(false)
            return
        }

        try {
            const sub = await subscriptionService.getMySubscription()
            setSubscription(sub)
        } catch (err) {
            console.error('Failed to fetch subscription', err)
            setSubscription(null)
        } finally {
            setLoadingSubscription(false)
        }
    }

    // Trigger subscription fetch when user changes
    useEffect(() => {
        fetchSubscription()
    }, [user])

    // Refresh subscription manually
    const refreshSubscription = async () => {
        setLoadingSubscription(true)
        await fetchSubscription()
    }

    // Login
    const login = async (credentials: LoginCredentials) => {
        setError(null)
        try {
            const data = await authService.login(credentials)
            const { token, user } = data
            localStorage.setItem('token', token)
            setUser(user)

            // Fetch subscription after successful login
            await fetchSubscription()

            return { success: true }
        } catch (err) {
            const axiosError = err as AxiosError<ApiError>
            const message = axiosError.response?.data?.message || 'Login failed'
            setError(message)
            return { success: false, error: message }
        }
    }

    // Register
    const register = async (userData: RegisterData) => {
        setError(null)
        try {
            const data = await authService.register(userData)
            const { token, user } = data
            localStorage.setItem('token', token)
            setUser(user)

            // Fetch subscription after successful registration
            await fetchSubscription()

            return { success: true }
        } catch (err) {
            const axiosError = err as AxiosError<ApiError>
            const message = axiosError.response?.data?.message || 'Registration failed'
            setError(message)
            return { success: false, error: message }
        }
    }

    // Logout
    const logout = async () => {
        try {
            await authService.logout()
        } catch (err) {
            console.error('Logout error', err)
        } finally {
            localStorage.removeItem('token')
            setUser(null)
            setSubscription(null)
        }
    }

    const value: AuthContextType = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        subscription,
        hasValidSubscription, // Add the computed property
        loadingSubscription,
        refreshSubscription,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}