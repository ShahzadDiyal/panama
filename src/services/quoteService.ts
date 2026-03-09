import api from './api'
import type { Quote, Message, PaginatedQuotesResponse, SendMessageResponse } from '../types'

export const quoteService = {
  // Create a new quote
  createQuote: async (data: {
    product_id: number
    quantity: number
    unit: string
    shipping_country: string
    shipping_city: string
    note?: string
  }): Promise<Quote> => {
    const response = await api.post('/user/quotes', data)
    return response.data.data
  },

  // Get all quotes for the logged-in user (paginated)
  getQuotes: async (page: number = 1): Promise<PaginatedQuotesResponse> => {
    const response = await api.get(`/user/quotes?page=${page}`)
    return response.data.data
  },

  // Get a specific quote
  getQuote: async (quoteId: number): Promise<Quote> => {
    const response = await api.get(`/user/quotes/${quoteId}`)
    return response.data.data
  },

  // Cancel a quote
  cancelQuote: async (quoteId: number): Promise<{ success: boolean }> => {
    const response = await api.post(`/user/quotes/${quoteId}/cancel`)
    return response.data
  },

  // Confirm/accept a quote
  confirmQuote: async (quoteId: number): Promise<{ success: boolean }> => {
    const response = await api.post(`/user/quotes/${quoteId}/confirm`)
    return response.data
  },

  // Send a message on a quote
  sendMessage: async (quoteId: number, message: string): Promise<SendMessageResponse> => {
    const response = await api.post(`/user/quotes/${quoteId}/messages`, { message })
    return response.data.data
  },

  // Get messages for a quote
 getMessages: async (quoteId: number): Promise<any> => {
  const response = await api.get(`/user/quotes/${quoteId}/messages`)
  return response.data // Return the full response, not just response.data.data
},

  // Mark messages as seen up to a certain message ID
  markMessagesAsSeen: async (quoteId: number, lastSeenMessageId: number): Promise<{ success: boolean }> => {
    const response = await api.post(`/user/quotes/${quoteId}/messages/seen`, {
      last_seen_message_id: lastSeenMessageId,
    })
    return response.data
  },
}