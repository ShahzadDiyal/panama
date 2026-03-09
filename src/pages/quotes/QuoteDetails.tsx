import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom' // Remove useNavigate, add Link
import { useAuth } from '../../context/AuthContext'
import { quoteService } from '../../services/quoteService'
import type { Quote, Message } from '../../types'

export default function QuoteDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [quote, setQuote] = useState<Quote | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
  // Wait for auth to finish loading before checking user
  const checkAuthAndFetch = async () => {
    if (!user) {
      // If still loading, wait
      return
    }
    
    try {
      // Fetch quote details
      const quoteData = await quoteService.getQuote(Number(id))
      setQuote(quoteData)
      
      // Fetch messages
    const messagesResponse = await quoteService.getMessages(Number(id))
// Extract messages from the response structure
const messagesData = messagesResponse?.data?.messages || []
setMessages(Array.isArray(messagesData) ? messagesData : [])
console.log('set messages:', messagesData)
      
      // Mark messages as seen
      if (messagesData.length > 0) {
        const lastId = messagesData[messagesData.length - 1].id
        await quoteService.markMessagesAsSeen(Number(id), lastId)
      }
    } catch (err) {
      console.error('Failed to fetch quote details', err)
    } finally {
      setLoading(false)
    }
  }
  
  checkAuthAndFetch()
}, [id, user])

useEffect(() => {
  if (quote) {
    console.log('Quote status:', quote.status)
    console.log('Is chat enabled?', quote.status === 'accepted')
  }
}, [quote])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

 const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!newMessage.trim()) return
  
  setSending(true)
  try {
    const response = await quoteService.sendMessage(Number(id), newMessage)
    
    const newMsg: Message = {
      id: response.id,
      quote_request_id: response.quote_request_id,
      sender_type: response.sender_type as 'user' | 'vendor',
      sender_id: response.sender_id,
      message: response.message,
      created_at: response.created_at,
      updated_at: response.updated_at,
      seen_by_user_at: null,
      seen_by_vendor_at: null,
      message_type: 'text',
      meta: null,
      attachment_path: null,
      attachment_type: null
    }
    
    // Ensure messages is an array before spreading
    setMessages(prevMessages => {
      const currentMessages = Array.isArray(prevMessages) ? prevMessages : []
      return [...currentMessages, newMsg]
    })
    
    setNewMessage('')
  } catch (err) {
    console.error('Failed to send message', err)
    alert('Failed to send message')
  } finally {
    setSending(false)
  }
}

  const handleAcceptQuote = async () => {
    if (!confirm('Are you sure you want to accept this quote?')) return
    
    setActionLoading(true)
    try {
      await quoteService.confirmQuote(Number(id))
      // Refresh quote data
      const updatedQuote = await quoteService.getQuote(Number(id))
      setQuote(updatedQuote)
      alert('Quote accepted successfully! You can now chat with the supplier.')
    } catch (err) {
      console.error('Failed to accept quote', err)
      alert('Failed to accept quote')
    } finally {
      setActionLoading(false)
    }
  }

  const handleCancelQuote = async () => {
    if (!confirm('Are you sure you want to cancel this quote?')) return
    
    setActionLoading(true)
    try {
      await quoteService.cancelQuote(Number(id))
      // Refresh quote data
      const updatedQuote = await quoteService.getQuote(Number(id))
      setQuote(updatedQuote)
      alert('Quote cancelled')
    } catch (err) {
      console.error('Failed to cancel quote', err)
      alert('Failed to cancel quote')
    } finally {
      setActionLoading(false)
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-yellow-100 text-yellow-800'
      case 'quoted': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'open': return 'Pending'
      case 'quoted': return 'Quote Received'
      case 'confirmed': return 'Confirmed' // This matches your screenshot
      case 'accepted': return 'Accepted' // This matches your screenshot
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#162B60]"></div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quote not found</h2>
          <Link to="/quotes" className="text-[#162B60] hover:underline cursor-pointer">
            Back to Quotes
          </Link>
        </div>
      </div>
    )
  }

  // Determine if chat should be enabled
  const isChatEnabled = quote.status === 'accepted'

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link to='/quotes'
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Quotes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quote Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quote Details Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{quote.product_title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(quote.status)}`}>
                  {getStatusDisplay(quote.status)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Quote ID</p>
                  <p className="font-medium text-gray-900">#{quote.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Quantity</p>
                  <p className="font-medium text-gray-900">{quote.quantity} {quote.unit}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Shipping to</p>
                  <p className="font-medium text-gray-900">{quote.shipping_city}, {quote.shipping_country}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Supplier</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#162B60] text-white flex items-center justify-center font-semibold text-sm">
                      {quote.vendor.business_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{quote.vendor.business_name}</p>
                      <p className="text-xs text-gray-500">{quote.vendor.location}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date requested</p>
                  <p className="font-medium text-gray-900">{formatDate(quote.created_at)}</p>
                </div>
                
                {quote.note && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Your note</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{quote.note}</p>
                  </div>
                )}
              </div>
              
              {/* Action Buttons - Based on quote status */}
              
              {/* Case 1: Open quote - User submitted, waiting for supplier */}
              {quote.status === 'open' && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={handleCancelQuote}
                    disabled={actionLoading}
                    className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-medium"
                  >
                    Cancel Quote Request
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Waiting for supplier to respond with pricing
                  </p>
                </div>
              )}
              
              {/* Case 2: Quoted - Supplier has responded with price */}
              {quote.status === 'quoted' && quote.quoted_price && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-600 mb-1">Supplier has quoted:</p>
                    <p className="text-3xl font-bold text-blue-700">${parseFloat(quote.quoted_price).toFixed(2)}</p>
                    {quote.quoted_moq && (
                      <p className="text-sm text-gray-600 mt-1">MOQ: {quote.quoted_moq} {quote.unit}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleAcceptQuote}
                      disabled={actionLoading}
                      className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-medium"
                    >
                      Accept Quote
                    </button>
                    <button
                      onClick={handleCancelQuote}
                      disabled={actionLoading}
                      className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-medium"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
              
              {/* Case 3: Confirmed - User accepted the quote */}
              {quote.status === 'accepted' && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Quote accepted at:</p>
                    <p className="text-2xl font-bold text-green-700">${parseFloat(quote.quoted_price || '0').toFixed(2)}</p>
                    <p className="text-sm text-green-600 mt-2">✓ You can now communicate with the supplier</p>
                  </div>
                </div>
              )}
              
              {/* Case 4: Cancelled - User cancelled */}
              {quote.status === 'cancelled' && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600">This quote has been cancelled</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Messages</h3>
                <p className="text-sm text-gray-500">Discuss details with {quote.vendor.business_name}</p>
              </div>
              
              {/* Messages Container */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {!messages || !Array.isArray(messages) || messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message, index) => {
                    const isOwnMessage = message.sender_type === 'user'
                    const showDate = index === 0 || 
                      formatDate(messages[index-1].created_at) !== formatDate(message.created_at)
                    
                      const isSeen = isOwnMessage 
    ? message.seen_by_vendor_at !== null  // Your message seen by vendor
    : message.seen_by_user_at !== null    // Vendor message seen by you


                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                              {formatDate(message.created_at)}
                            </span>
                          </div>
                        )}
                        
                         <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : ''}`}>
          <div
            className={`rounded-2xl px-4 py-2 ${
              isOwnMessage
                ? 'bg-[#162B60] text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p className="text-sm">{message.message}</p>
          </div>
          <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
            isOwnMessage ? 'justify-end' : 'justify-start'
          }`}>
            <span>{formatTime(message.created_at)}</span>
            
            {/* Show seen indicator only for user's own messages */}
            {isOwnMessage && (
              <span className="flex items-center gap-1">
                {isSeen ? (
                  <>
                    <span className="text-green-600">✓✓</span>
                    <span className="text-green-600 text-[10px]">Seen</span>
                  </>
                ) : (
                  <span className="text-gray-400">✓</span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input - Only show for confirmed quotes */}
              {isChatEnabled ? (
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162B60] focus:border-transparent"
                      disabled={sending}
                    />
                    <button
                      type="submit"
                      disabled={sending || !newMessage.trim()}
                      className="px-6 py-3 bg-[#162B60] text-white rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {sending ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-gray-500">
                  {quote.status === 'open' && "Waiting for supplier to respond. Chat will be available after supplier quotes."}
                  {quote.status === 'quoted' && "Please accept or decline the quote to start chatting."}
                  {quote.status === 'cancelled' && "This quote has been cancelled. Chat is disabled."}
                  {quote.status === 'accepted' && "Chat is enabled. Start your conversation!"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}