import { Link, useParams } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getImageUrl, publicService } from '../../services/publicService'
import { contactService } from '../../services/contactService'
import { quoteService } from '../../services/quoteService'
import type { VendorDetails, ProductListItem } from '../../types'

import supplier_profile from '../../assets/supplier_details.png'
import verified_badge from '../../assets/verified_tick_.png'
import recent_icon from '../../assets/recent_icon.svg'
import star_icon from '../../assets/star_icon.png'
import arrow_left_icon from '../../assets/arrow_left_icon.svg'
import dropdown_icon from '../../assets/dropdown_icon.png'
import lock_icon from '../../assets/lock_icon_1.svg'

interface Deal {
  id: number
  title: string
  category: string
  moq: string
  priceRange: string
  location: string
  verified: boolean
  images: string[]
  isPremium?: boolean
}

interface WhatsAppResponse {
  vendor_id: number
  vendor_name: string
  product_id: number
  product_name: string
  whatsapp_no: string
  whatsapp_link: string
}

const CATEGORIES = ['All', 'Food & Beverage', 'Apparel', 'Electronics', 'Packaging & Materials', 'Beauty & Personal Care', 'Metals', 'Automotive', 'Healthcare', 'Handicrafts', 'Logistics', 'Marine & Fishing']
const SUPPLIER_TYPES = ['All Types', 'Manufacturer', 'Wholesaler', 'Distributor', 'Exporter']
const LOCATIONS = ['All Locations', 'Panama City', 'Colón', 'Panama Oeste', 'Chiriqui', 'Bocas del Toro', 'Veraguas']
const MOQ_RANGES = ['Any MOQ', 'Under $500', '$500–$2,000', '$2,000–$5,000', '$5,000+']

function QuoteModal({ isOpen, onClose, product }: { 
  isOpen: boolean; 
  onClose: () => void; 
  product: { id: number; title: string; supplier: string; moq?: number } | null 
}) {
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    quantity: product?.moq || '',
    unit: 'units',
    shipping_country: '',
    shipping_city: '',
    note: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        quantity: product.moq || ''
      }))
    }
  }, [product])

  if (!isOpen || !product) return null

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
      
      setFormData({
        quantity: '',
        unit: 'units',
        shipping_country: '',
        shipping_city: '',
        note: ''
      })
      
      onClose()
      alert('Quote request sent successfully!')
    } catch (err: any) {
      console.error('Failed to send quote', err)
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
          
          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <p className="font-semibold text-gray-900">{product.title}</p>
            <p className="text-sm text-gray-600 mt-1">Supplier: {product.supplier}</p>
            {product.moq && (
              <p className="text-xs text-gray-500 mt-2">Recommended MOQ: {product.moq} units</p>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
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

function DealCard({ deal, onQuoteClick }: { deal: Deal; onQuoteClick: (deal: Deal) => void }) {
  const [imgIndex, setImgIndex] = useState<number>(0)

  const goTo = (i: number) => setImgIndex(i)

  const cardClasses = deal.isPremium
    ? "flex-shrink-0 w-[300px] sm:w-[250px] md:w-[260px] lg:w-[270px] xl:w-[280px] bg-white/20 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/30 shadow-lg relative"
    : "flex-shrink-0 w-[300px] sm:w-[250px] md:w-[260px] lg:w-[270px] xl:w-[280px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 p-[10px]"

  return (
    <div className={`${cardClasses} p-[10px]`}>
      {deal.isPremium && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
          <div
            className="flex flex-col items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-[100%] px-[100%] shadow-xl mx-4"
            style={{ boxShadow: '0 8px 32px rgba(60,80,160,0.08)' }}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-slate-700 text-[16px] font-bold text-center">Go Premium</p>
          </div>
        </div>
      )}

      <div className="rounded-3xl overflow-hidden h-full flex flex-col">
        <div className="relative w-full overflow-hidden rounded-3xl" style={{ aspectRatio: '1 / 1' }}>
          {deal.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={deal.title}
              draggable={false}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${i === imgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                } ${deal.isPremium ? 'blur-sm' : ''}`}
            />
          ))}

          {deal.images.length > 1 && !deal.isPremium && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
              {deal.images.map((_, i) => (
                <button
                  key={i}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => goTo(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === imgIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/55'
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className={`pt-3 pb-3 flex flex-col flex-1 ${deal.isPremium ? 'opacity-50' : ''}`}>
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-slate-800 text-[16px] leading-snug">
              {deal.title}
            </h3>
            <span className="text-[11px] text-slate-400 whitespace-nowrap mt-0.5 flex-shrink-0">
              {deal.category}
            </span>
          </div>

          <div className="flex items-center justify-between text-[12px] mb-2">
            <span className="text-slate-500 text-[14px] font-semibold">MOQ</span>
            <span className="text-blue-600 text-[14px] font-semibold">{deal.moq}</span>
          </div>

          <div className="flex items-center justify-between text-[12px] mb-3">
            <span className="text-slate-500 text-[14px] font-semibold">Price Range</span>
            <span className="text-slate-700 font-medium">{deal.priceRange}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 text-slate-500 text-[14px] font-semibold">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {deal.location}
            </div>
            {deal.verified && (
              <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            )}
          </div>

          <button 
            onClick={() => onQuoteClick(deal)}
            className="group mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 hover:bg-[#162B60] hover:border-[#162B60] hover:text-white text-slate-700 text-[13px] font-medium transition-all duration-200 bg-[#C3E8FF]"
          >
            Request Quote
            <svg
              className="w-8 h-8 transition-transform duration-300 group-hover:rotate-310 bg-[#CFF6FF] rounded-full text-black p-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function Section1({ 
  supplier, 
  isMobile, 
  onWhatsAppClick, 
  whatsappLoading,
  whatsappNumber 
}: { 
  supplier: any; 
  isMobile: boolean;
  onWhatsAppClick: () => void;
  whatsappLoading: boolean;
  whatsappNumber: string | null;
}) {
  return (
    <div
      className={`min-h-screen ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #E8DDFF 0%, #f5f0ff 60%, #FFFFFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
        <div className="space-y-6">
          <div className="px-4 sm:px-6 md:px-10 py-4 my-12 sm:py-6 bg-white/40 rounded-2xl md:rounded-full inline-flex flex-col justify-center items-center gap-4 w-full">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
              <img 
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover" 
                src={supplier?.image || supplier_profile} 
                alt={supplier?.name || 'Supplier'} 
              />
              <div className="flex flex-col justify-center items-start gap-4 flex-1 md:ml-8 w-full">
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="w-full md:w-80 flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch justify-start text-zinc-800 text-xl sm:text-2xl font-medium capitalize leading-7 sm:leading-9">
                      {supplier?.name}
                    </div>
                    <div className="flex justify-start items-center gap-3">
                      <img src={verified_badge} alt="verified_badge" className="w-5 h-5" />
                      <div className="text-right justify-start text-blue-600 text-sm sm:text-base font-medium">
                        {supplier?.verified ? 'Verified Supplier' : 'Supplier'}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-44 self-stretch flex flex-col justify-between items-end">
                    <div className="flex justify-start items-center gap-2">
                      <img src={star_icon} alt="" className="w-4 h-4" />
                      <div className="text-right justify-start text-zinc-800/40 text-sm sm:text-base font-medium">
                        {supplier?.rating} Rating
                      </div>
                    </div>
                    <div className="self-stretch flex justify-center items-center gap-2">
                      <img src={recent_icon} alt="" className="w-4 h-4" />
                      <div className="text-right justify-start text-zinc-800/60 text-sm sm:text-base font-medium">
                        Responds in {supplier?.responseTime}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
                  <div className="text-right justify-start text-zinc-800/60 text-sm sm:text-base font-medium">
                    {supplier?.category}
                  </div>
                  <div className="justify-start text-zinc-800/60 text-sm sm:text-base font-medium">
                    {supplier?.country}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <button 
                onClick={onWhatsAppClick}
                disabled={whatsappLoading}
                className="w-full sm:w-auto px-6 sm:px-10 py-2 sm:py-3 bg-sky-200 rounded-[76px] flex justify-center items-center gap-2.5 hover:bg-sky-300 transition-colors disabled:opacity-50"
              >
                <div className="justify-start text-zinc-800 text-sm sm:text-base font-semibold">
                  {whatsappLoading ? 'Loading...' : whatsappNumber ? `WhatsApp: ${whatsappNumber}` : 'Contact via WhatsApp'}
                </div>
                <img src={arrow_left_icon} alt="" className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full p-4 sm:p-6 md:p-10 bg-white/30 mt-10 rounded-2xl flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-80">
            <div className="flex-1 flex flex-col justify-start items-start gap-4 w-full">
              <div className="self-stretch justify-start text-zinc-800/70 text-xl sm:text-2xl font-normal capitalize leading-7 sm:leading-9">
                About This Supplier
              </div>
              <div className="self-stretch justify-start text-zinc-800/50 text-sm sm:text-base font-medium capitalize leading-6 sm:leading-8 tracking-tight">
                {supplier?.description}
              </div>
            </div>
            <div className="flex-1 self-stretch flex flex-col justify-between items-start gap-4 w-full">
              <div className="self-stretch flex justify-between items-center">
                <div className="justify-start text-zinc-800/50 text-sm sm:text-base font-medium capitalize leading-6">Business Type</div>
                <div className="justify-start text-zinc-800/70 text-sm sm:text-base font-medium capitalize leading-6">{supplier?.businessType}</div>
              </div>
              <div className="self-stretch flex justify-between items-center">
                <div className="justify-start text-zinc-800/50 text-sm sm:text-base font-medium capitalize leading-6">Years in Business</div>
                <div className="justify-start text-zinc-800/70 text-sm sm:text-base font-medium capitalize leading-6">{supplier?.yearsInBusiness}</div>
              </div>
              <div className="self-stretch flex justify-between items-center">
                <div className="justify-start text-zinc-800/50 text-sm sm:text-base font-medium capitalize leading-6">Export Markets</div>
                <div className="justify-start text-zinc-800/70 text-sm sm:text-base font-medium capitalize leading-6">{supplier?.exportMarkets}</div>
              </div>
              <div className="self-stretch flex justify-between items-center">
                <div className="justify-start text-zinc-800/50 text-sm sm:text-base font-medium capitalize leading-6">Languages</div>
                <div className="justify-start text-zinc-800/70 text-sm sm:text-base font-medium capitalize leading-6">{supplier?.languages}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section2({ 
  isMobile, 
  products,
  onQuoteClick 
}: { 
  isMobile: boolean;
  products: ProductListItem[];
  onQuoteClick: (deal: Deal) => void;
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [supplierType, setSupplierType] = useState('All Types')
  const [location, setLocation] = useState('All Locations')
  const [moq, setMoq] = useState('Any MOQ')

  const dropdownClass = `appearance-none bg-white border border-gray-200 rounded-[10px]
    pl-3 pr-8 py-2 text-xs sm:text-sm text-slate-600 font-medium w-full
    focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all`

  const filteredProducts = products.filter(product => {
    const matchesSearch = search === '' || 
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.short_description.toLowerCase().includes(search.toLowerCase())
    
    const matchesCategory = category === 'All' || 
      product.category?.name === category
    
    return matchesSearch && matchesCategory
  })

  return (
    <div
      className={`min-h-screen ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #eef1fb 60%, #FFFFFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
        <div className="mt-8">
          <div className="max-w-4xl mx-auto mt-4 sm:mt-5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 sm:pl-5 pr-10 sm:pr-12 py-3 sm:py-3.5 border border-gray-400
                rounded-full text-slate-700 placeholder-gray-400 text-sm sm:text-[15px] font-medium
                bg-white/60 focus:bg-white focus:outline-none focus:border-blue-300
                focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-4 sm:mt-6 my-6">
            <div className="bg-white/50 rounded-xl p-3 sm:p-4">
              <div className="justify-between flex flex-wrap">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${dropdownClass}`}>
                      <option value="All">Category</option>
                      {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                    </select>
                    <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>

                  <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                    <select value={supplierType} onChange={(e) => setSupplierType(e.target.value)} className={`${dropdownClass}`}>
                      {SUPPLIER_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>

                  <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                    <select value={location} onChange={(e) => setLocation(e.target.value)} className={`${dropdownClass}`}>
                      {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                    </select>
                    <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>

                  <div className="relative flex-1 min-w-[110px] sm:flex-none sm:w-auto">
                    <select value={moq} onChange={(e) => setMoq(e.target.value)} className={`${dropdownClass}`}>
                      {MOQ_RANGES.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={() => { setCategory('All'); setSupplierType('All Types'); setLocation('All Locations'); setMoq('Any MOQ'); setSearch('') }}
                  className="w-9 h-9 flex items-center justify-center hover:bg-yellow-100 rounded-lg transition-all flex-shrink-0"
                  title="Reset filters"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
              {filteredProducts.map((product) => (
                <DealCard 
                  key={product.id} 
                  deal={{
                    id: product.id,
                    title: product.title,
                    category: product.category?.name || 'Uncategorized',
                    moq: `${product.moq} units`,
                    priceRange: `$${parseFloat(product.price).toFixed(2)} – $${product.old_price ? parseFloat(product.old_price).toFixed(2) : parseFloat(product.price).toFixed(2)} / unit`,
                    location: product.location,
                    verified: true,
                    images: product.images && Array.isArray(product.images) 
                      ? product.images.map(img => getImageUrl(img.path))
                      : product.cover_image 
                        ? [getImageUrl(product.cover_image)]
                        : [],
                    isPremium: false
                  }}
                  onQuoteClick={onQuoteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Section3({ isMobile, whatsappData }: { 
  isMobile: boolean;
  whatsappData: WhatsAppResponse | null;
}) {
  const { subscription } = useAuth()
  const hasActiveSubscription = subscription?.status === 'active'

  const whatsappNumber = whatsappData?.whatsapp_no || '+507 XXX XXXX'
  
  const hasRealContact = hasActiveSubscription && 
                        whatsappData?.whatsapp_no && 
                        whatsappData.whatsapp_no !== 'hidden' &&
                        whatsappData.whatsapp_no !== '+507 XXX XXXX'

  return (
    <div
      className={`min-h-screen ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #eef1fb 0%, #f5f0ff 60%, #eaf4ff 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
        <div className="my-8 sm:my-16 relative">
          <div className="relative w-full max-w-[90%] sm:max-w-[581px] mx-auto my-30 ">
            <div className="w-full px-4 sm:px-10 py-12 bg-zinc-100/40 rounded-full outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-center items-center gap-4">
              <div className="self-stretch flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
                <div className="text-right justify-start text-zinc-800 text-sm sm:text-base font-medium">WhatsApp:</div>
                <div className={`justify-start text-zinc-800/60 text-sm sm:text-base font-medium ${!hasRealContact ? 'blur-lg' : ''}`}>
                  {whatsappNumber}
                </div>
              </div>
               
            </div>
            
            {!hasRealContact && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[21px] flex flex-col justify-start items-center gap-1 w-full px-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative overflow-hidden">
                  <img src={lock_icon} alt="lock" />
                </div>
                <div className="self-stretch justify-start text-zinc-800 text-sm sm:text-base font-normal text-center whitespace-normal">
                  Unlock to Contact Supplier
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-zinc-800 text-2xl sm:text-3xl md:text-4xl font-medium">Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative px-4 sm:px-0">
            <div className="w-[280px] relative p-10 bg-[#F3F5F8] rounded-2xl flex flex-col gap-4">
              <div className="absolute top-[-40px] sm:top-[-60px] right-4 sm:right-6 text-gray-400 text-4xl sm:text-6xl font-semibold leading-none">
                ,,
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-zinc-800 text-[20px] sm:text-xl font-medium">
                  Michael Rodriguez
                </div>
                <div className="text-zinc-800/80 text-[16px] font-medium">
                  Wholesale Distributor – Mexico
                </div>
              </div>
              <div className="text-zinc-800/50 text-xs sm:text-sm font-medium">
                Very professional supplier. The pricing was competitive, and communication through WhatsApp was fast and clear. I successfully completed my first bulk order without any issues.
              </div>
            </div>

            <div className="relative w-[280px] p-10 bg-[#F3F5F8] rounded-2xl flex flex-col gap-4">
              <div className="absolute top-[-40px] sm:top-[-60px] right-4 sm:right-6 text-gray-400 text-4xl sm:text-6xl font-semibold leading-none">
                ,,
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-zinc-800 text-lg sm:text-xl font-medium">
                  James Walker
                </div>
                <div className="text-zinc-800/80 text-sm sm:text-base font-medium">
                  Importer – USA
                </div>
              </div>
              <div className="text-zinc-800/50 text-xs sm:text-sm font-medium">
                Reliable supplier with excellent communication and consistent quality.
              </div>
            </div>

            <div className="relative w-[280px] p-10 bg-[#F3F5F8] rounded-2xl flex flex-col gap-4">
              <div className="absolute top-[-40px] sm:top-[-60px] right-4 sm:right-6 text-gray-400 text-4xl sm:text-6xl font-semibold leading-none">
                ,,
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-zinc-800 text-lg sm:text-xl font-medium">
                  Andrew Collins
                </div>
                <div className="text-zinc-800/80 text-sm sm:text-base font-medium">
                  E-commerce Seller – USA
                </div>
              </div>
              <div className="text-zinc-800/50 text-xs sm:text-sm font-medium">
                The supplier provided accurate product details and responded quickly to all my questions. The entire sourcing process was smooth and trustworthy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TOTAL_SECTIONS = 3

export default function SupplierDetails() {
  const { id } = useParams()
  const { user, subscription } = useAuth()
  const [currentSection, setCurrentSection] = useState(0)
  const [leavingUp, setLeavingUp] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [vendorData, setVendorData] = useState<VendorDetails | null>(null)
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [whatsappLoading, setWhatsappLoading] = useState(false)
  const [whatsappData, setWhatsappData] = useState<WhatsAppResponse | null>(null)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; title: string; supplier: string; moq?: number } | null>(null)
  
  const isAnimatingRef = useRef(false)
  const sectionRef = useRef(0)
  const wheelCooldown = useRef(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchVendorData = async () => {
      if (!id) return
      try {
        setLoading(true)
        const vendorResponse = await publicService.getVendorDetails(Number(id))
        setVendorData(vendorResponse)
        
        const productsResponse = await publicService.getVendorProducts(Number(id))
        setProducts(productsResponse.products.data)

        if (subscription?.status === 'active' && productsResponse.products.data.length > 0) {
          try {
            const firstProductId = productsResponse.products.data[0].id
            const whatsappResponse = await contactService.getVendorWhatsApp(firstProductId)
            setWhatsappData(whatsappResponse as any)
          } catch (err) {
            console.error('Failed to fetch WhatsApp number', err)
          }
        }
      } catch (err) {
        setError('Failed to load supplier details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchVendorData()
  }, [id, subscription])

  const updateSection = (n: number) => {
    sectionRef.current = n
    setCurrentSection(n)
  }

  const goNext = () => {
    if (sectionRef.current >= TOTAL_SECTIONS - 1) return
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    setLeavingUp(true)
    setTimeout(() => {
      setLeavingUp(false)
      updateSection(sectionRef.current + 1)
      isAnimatingRef.current = false
    }, 320)
  }

  const goPrev = () => {
    if (sectionRef.current <= 0) return
    if (isAnimatingRef.current) return
    updateSection(sectionRef.current - 1)
  }

  const goNextRef = useRef(goNext)
  const goPrevRef = useRef(goPrev)
  goNextRef.current = goNext
  goPrevRef.current = goPrev

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isMobile) return
      if (e.key === 'ArrowDown') goNextRef.current()
      else if (e.key === 'ArrowUp') goPrevRef.current()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (wheelCooldown.current) return
      if (isAnimatingRef.current) return

      const currentSectionEl = sectionRefs.current[sectionRef.current]
      if (!currentSectionEl) return

      const { scrollTop, scrollHeight, clientHeight } = currentSectionEl
      const isAtTop = scrollTop <= 5
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5

      if (e.deltaY > 0 && isAtBottom) {
        e.preventDefault()
        goNextRef.current()
        wheelCooldown.current = true
        setTimeout(() => {
          wheelCooldown.current = false
        }, 800)
      }
      else if (e.deltaY < 0 && isAtTop) {
        e.preventDefault()
        goPrevRef.current()
        wheelCooldown.current = true
        setTimeout(() => {
          wheelCooldown.current = false
        }, 800)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isMobile])

  const handleWhatsAppContact = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }
    
    if (!id) return
    
    if (subscription?.status !== 'active') {
      alert('You need an active subscription to contact suppliers via WhatsApp')
      return
    }

    if (whatsappData?.whatsapp_link) {
      window.open(whatsappData.whatsapp_link, '_blank')
    } else {
      setWhatsappLoading(true)
      try {
        if (products.length > 0) {
          const response = await contactService.getVendorWhatsApp(products[0].id)
          setWhatsappData(response as any)
          window.open((response as any).whatsapp_link, '_blank')
        }
      } catch (err) {
        alert('Failed to fetch WhatsApp contact')
        console.error(err)
      } finally {
        setWhatsappLoading(false)
      }
    }
  }

  const handleQuoteClick = (deal: Deal) => {
    if (!user) {
      window.location.href = '/login'
      return
    }
    setSelectedProduct({
      id: deal.id,
      title: deal.title,
      supplier: supplier?.name || 'Unknown Supplier',
      moq: parseInt(deal.moq) || undefined
    })
    setShowQuoteModal(true)
  }

  const supplier = vendorData ? {
    id: vendorData.id,
    name: vendorData.business_name,
    category: vendorData.category?.name || 'Uncategorized',
    country: vendorData.location,
    rating: 4.8,
    reviews: 312,
    verified: vendorData.status === 'approved',
    responseTime: '24 hrs',
    description: vendorData.about || 'No description available',
    businessType: 'Manufacturer & Exporter',
    yearsInBusiness: `${vendorData.years_in_business}+ Years`,
    exportMarkets: vendorData.export_markets.join(', ') || 'Global',
    languages: vendorData.languages.join(', ') || 'English',
    image: getImageUrl(vendorData.image_path)
  } : null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#162B60]"></div>
      </div>
    )
  }

  if (error || !supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error</p>
          <p>{error || 'Supplier not found'}</p>
          <Link to="/supplier" className="mt-4 inline-block px-6 py-2 bg-[#162B60] text-white rounded-lg">
            Back to Suppliers
          </Link>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="w-full">
        <Section1 
          supplier={supplier} 
          isMobile={true} 
          onWhatsAppClick={handleWhatsAppContact}
          whatsappLoading={whatsappLoading}
          whatsappNumber={whatsappData?.whatsapp_no || null}
        />
        <Section2 
          isMobile={true} 
          products={products} 
          onQuoteClick={handleQuoteClick}
        />
        <Section3 
          isMobile={true} 
          whatsappData={whatsappData} 
        />
        <QuoteModal 
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
          product={selectedProduct}
        />
      </div>
    )
  }

  const cls = leavingUp ? 'supplier-leave-up' : 'supplier-enter-down'

  return (
    <>
      <style>{`
        @keyframes supplierLeaveUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-70px); }
        }
        @keyframes supplierEnterDown {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .supplier-leave-up {
          animation: supplierLeaveUp 0.32s ease-in forwards;
          pointer-events: none;
        }
        .supplier-enter-down {
          animation: supplierEnterDown 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      <div className="w-full overflow-hidden">
        <div className={cls}>
          {/* Section 0 */}
          {currentSection === 0 && (
            <div 
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[0] = el;
              }}
              className="h-screen overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              <Section1 
                supplier={supplier} 
                isMobile={false} 
                onWhatsAppClick={handleWhatsAppContact}
                whatsappLoading={whatsappLoading}
                whatsappNumber={whatsappData?.whatsapp_no || null}
              />
            </div>
          )}
          
          {/* Section 1 */}
          {currentSection === 1 && (
            <div 
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[1] = el;
              }}
              className="h-screen overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <Section2 
                isMobile={false} 
                products={products} 
                onQuoteClick={handleQuoteClick}
              />
            </div>
          )}
          
          {/* Section 2 */}
          {currentSection === 2 && (
            <div 
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[2] = el;
              }}
              className="h-screen overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <Section3 
                isMobile={false} 
                whatsappData={whatsappData} 
              />
            </div>
          )}
        </div>
      </div>

      <QuoteModal 
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        product={selectedProduct}
      />
    </>
  )
}