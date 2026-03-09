import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { quoteService } from '../../services/quoteService'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    title: string
    supplier: string
    moq?: number
  }
  onSuccess?: () => void
}

export default function QuoteModal({ isOpen, onClose, product, onSuccess }: QuoteModalProps) {
  const { user, subscription, loadingSubscription } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    quantity: product.moq || '',
    unit: 'units',
    shipping_country: '',
    shipping_city: '',
    note: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        quantity: product.moq || ''
      }))
    }
  }, [product])

  if (!isOpen) return null

  // Show loading while checking subscription
  if (loadingSubscription) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#162B60] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Checking subscription...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show upgrade prompt if no active subscription
  if (!subscription || subscription.status !== 'active') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Subscription Required</h3>
            <p className="text-gray-600 mb-6">
              You need an active subscription to request quotes from suppliers.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <Link
                to="/pricing"
                className="flex-1 py-3 bg-[#162B60] text-white rounded-xl hover:bg-blue-900 transition-colors text-center"
                onClick={onClose}
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required'
    } else if (Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0'
    }
    
    if (!formData.shipping_country) {
      newErrors.shipping_country = 'Shipping country is required'
    }
    
    if (!formData.shipping_city) {
      newErrors.shipping_city = 'Shipping city is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      window.location.href = '/login'
      return
    }
    
    if (!validateForm()) return
    
    setSubmitting(true)
    try {
      await quoteService.createQuote({
        product_id: product.id,
        quantity: Number(formData.quantity),
        unit: formData.unit,
        shipping_country: formData.shipping_country,
        shipping_city: formData.shipping_city,
        note: formData.note
      })
      
      // Reset form
      setFormData({
        quantity: '',
        unit: 'units',
        shipping_country: '',
        shipping_city: '',
        note: ''
      })
      
      onSuccess?.()
      onClose()
      alert('Quote request sent successfully!')
    } catch (err: any) {
      console.error('Failed to send quote', err)
      
      // Handle specific error messages
      const errorMessage = err.response?.data?.message || 'Failed to send quote request. Please try again.'
      alert(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Request Quote</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Product info */}
          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <p className="font-semibold text-gray-900">{product.title}</p>
            <p className="text-sm text-gray-600 mt-1">Supplier: {product.supplier}</p>
            {product.moq && (
              <p className="text-xs text-gray-500 mt-2">Recommended MOQ: {product.moq} units</p>
            )}
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162B60] focus:border-transparent transition ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter quantity"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>
            
            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162B60] focus:border-transparent transition bg-white"
              >
                <option value="units">Units</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="pcs">Pieces (pcs)</option>
                <option value="boxes">Boxes</option>
                <option value="liters">Liters (L)</option>
                <option value="tons">Tons</option>
                <option value="meters">Meters (m)</option>
              </select>
            </div>
            
            {/* Shipping Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.shipping_country}
                onChange={(e) => setFormData({...formData, shipping_country: e.target.value})}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162B60] focus:border-transparent transition ${
                  errors.shipping_country ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. United Arab Emirates"
              />
              {errors.shipping_country && (
                <p className="text-red-500 text-xs mt-1">{errors.shipping_country}</p>
              )}
            </div>
            
            {/* Shipping City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.shipping_city}
                onChange={(e) => setFormData({...formData, shipping_city: e.target.value})}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162B60] focus:border-transparent transition ${
                  errors.shipping_city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Dubai"
              />
              {errors.shipping_city && (
                <p className="text-red-500 text-xs mt-1">{errors.shipping_city}</p>
              )}
            </div>
            
            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#162B60] focus:border-transparent transition resize-none"
                rows={3}
                placeholder="Any specific requirements, delivery timeline, quality standards, etc."
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 px-4 bg-[#162B60] text-white font-medium rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Submit Quote'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}