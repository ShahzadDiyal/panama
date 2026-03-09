import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { quoteService } from '../../services/quoteService'
import type { Quote } from '../../types'

export default function Quotes() {
  const { user } = useAuth()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'open' | 'confirmed' | 'cancelled'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
      return
    }
    
    const fetchQuotes = async () => {
      try {
        setLoading(true)
        const response = await quoteService.getQuotes(currentPage)
        setQuotes(response.data)
        setLastPage(response.last_page)
        setTotal(response.total)
      } catch (err) {
        console.error('Failed to fetch quotes', err)
        setQuotes([])
      } finally {
        setLoading(false)
      }
    }
    fetchQuotes()
  }, [user, currentPage])

  const filteredQuotes = quotes.filter(quote => 
    filter === 'all' ? true : quote.status === filter
  )

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'open': return 'Pending'
      case 'confirmed': return 'Confirmed'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#162B60]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Quotes</h1>
            <p className="text-gray-600 mt-1">
              {total > 0 ? `You have ${total} quote requests` : 'Manage your quote requests and negotiations'}
            </p>
          </div>
          
          {/* Filter tabs */}
          <div className="flex gap-2 mt-4 sm:mt-0">
            {(['all', 'open', 'confirmed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                  ${filter === status 
                    ? 'bg-[#162B60] text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {status === 'open' ? 'Pending' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes grid */}
        {filteredQuotes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? "You haven't requested any quotes yet." 
                : `No ${filter === 'open' ? 'pending' : filter} quotes at the moment.`}
            </p>
            <Link
              to="/deals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#162B60] text-white rounded-lg hover:bg-blue-900 transition-colors"
            >
              Browse Deals
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {filteredQuotes.map((quote) => (
                <Link
                  key={quote.id}
                  to={`/quotes/${quote.id}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {quote.product_title}
                        </h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(quote.status)}`}>
                          {getStatusDisplay(quote.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        Quote #{quote.id} • Quantity: {quote.quantity} {quote.unit}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📍 {quote.shipping_city}, {quote.shipping_country}</span>
                        <span>📅 {formatDate(quote.created_at)}</span>
                        <span className="flex items-center gap-1">
                          <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            {quote.vendor.business_name.charAt(0)}
                          </span>
                          {quote.vendor.business_name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center gap-4">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {lastPage > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {lastPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(lastPage, p + 1))}
                  disabled={currentPage === lastPage}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}