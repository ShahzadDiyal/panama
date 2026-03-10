import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import dropdown_icon from '../../assets/dropdown_icon.png'
import sourcing_illustrator from '../../assets/souring_illustrator.png'
import { publicService, getImageUrl } from '../../services/publicService'
import type { Category, ProductListItem } from '../../types'

// ── Types ─────────────────────────────────────────────────────────────────
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

const SUPPLIER_TYPES = ['All Types', 'Manufacturer', 'Wholesaler', 'Distributor', 'Exporter']
const LOCATIONS = ['All Locations', 'Panama City', 'Colón', 'Panama Oeste', 'Chiriqui', 'Bocas del Toro', 'Veraguas']
const MOQ_RANGES = ['Any MOQ', 'Under $500', '$500–$2,000', '$2,000–$5,000', '$5,000+']

// ── DealCard Component ───────────────────────────────────────────────────
function DealCard({ deal }: { deal: Deal }) {
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

          <Link to={`/deals/${deal.id}`} className="group mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 hover:bg-[#162B60] hover:border-[#162B60] hover:text-white text-slate-700 text-[13px] font-medium transition-all duration-200 bg-[#C3E8FF]">
            Request Quote
            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]`}>
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Section 1 Component (Deals Grid) ────────────────────────────────────
function Section1({ isMobile }: { isMobile: boolean }) {
  const { subscription } = useAuth()
  const [search, setSearch] = useState('')
  const [supplierType, setSupplierType] = useState('All Types')
  const [location, setLocation] = useState('All Locations')
  const [moq, setMoq] = useState('Any MOQ')

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loadingCategories, setLoadingCategories] = useState(true)

  const [deals, setDeals] = useState<Deal[]>([])
  const [loadingDeals, setLoadingDeals] = useState(true)
  const [dealsError, setDealsError] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await publicService.getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to load categories', error)
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoadingDeals(true)
        const vendorsResponse = await publicService.getVendors({ page: 1 })
        let allProducts: ProductListItem[] = []
        const vendorsToFetch = vendorsResponse.data.slice(0, 5)

        const productPromises = vendorsToFetch.map(vendor =>
          publicService.getVendorProducts(vendor.id).catch(err => {
            console.error(`Failed to fetch products for vendor ${vendor.id}`, err)
            return null
          })
        )

        const productResponses = await Promise.all(productPromises)

        productResponses.forEach(response => {
          if (response && response.products && response.products.data) {
            allProducts = [...allProducts, ...response.products.data]
          }
        })

        const dealProducts = allProducts.filter(product => product.is_deal === true)
        const sortedProducts = dealProducts.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        const formattedDeals = sortedProducts.map(mapProductToDeal)
        setDeals(formattedDeals)
        setDealsError('')
      } catch (err) {
        console.error('Failed to fetch deals', err)
        setDealsError('Failed to load deals')
      } finally {
        setLoadingDeals(false)
      }
    }

    fetchDeals()
  }, [])

  const mapProductToDeal = (product: ProductListItem): Deal => {
    const imageUrls =
      product.images && Array.isArray(product.images) && product.images.length > 0
        ? product.images.map(img => getImageUrl(img.path))
        : product.cover_image
          ? [getImageUrl(product.cover_image)]
          : ['https://via.placeholder.com/400x400?text=No+Image']

    const price = parseFloat(product.price).toFixed(2)
    const priceRange = product.old_price
      ? `$${price} – $${parseFloat(product.old_price).toFixed(2)} / unit`
      : `$${price} / unit`

    const moqText = `${product.moq} units`

    const hasActiveSubscription = subscription?.status === 'active'
    const isPremium = hasActiveSubscription ? false : product.id % 3 === 0

    return {
      id: product.id,
      title: product.title,
      category: product.category?.name || 'Uncategorized',
      moq: moqText,
      priceRange,
      location: product.location,
      verified: true,
      images: imageUrls,
      isPremium,
    }
  }

  const filteredDeals = deals.filter(deal => {
    const matchesSearch =
      search === '' ||
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const dropdownClass = `appearance-none bg-white border border-gray-200 rounded-[10px]
    pl-3 pr-8 py-2 text-xs sm:text-sm text-slate-600 font-medium w-full
    focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all`

  return (
    <div
      className={`min-h-screen ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #eef1fb 60%, #FFFFFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
        <div className="mt-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-800 leading-tight">
              Discover Exclusive Wholesale<br />Deals in Panama
            </h1>
            <p className="text-gray-400 font-semibold text-xs sm:text-sm leading-relaxed sm:text-right sm:max-w-xs">
              Browse limited-time bulk offers directly from verified distributors and suppliers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-4 sm:mt-5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search suppliers, products, or categories..."
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
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={dropdownClass}
                    >
                      <option value="All">All Categories</option>
                      {loadingCategories ? (
                        <option disabled>Loading...</option>
                      ) : (
                        categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))
                      )}
                    </select>
                    <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>

                  <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                    <select value={supplierType} onChange={(e) => setSupplierType(e.target.value)} className={dropdownClass}>
                      {SUPPLIER_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>

                  <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                    <select value={location} onChange={(e) => setLocation(e.target.value)} className={dropdownClass}>
                      {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                    </select>
                    <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>

                  <div className="relative flex-1 min-w-[110px] sm:flex-none sm:w-auto">
                    <select value={moq} onChange={(e) => setMoq(e.target.value)} className={dropdownClass}>
                      {MOQ_RANGES.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSupplierType('All Types')
                    setLocation('All Locations')
                    setMoq('Any MOQ')
                    setSearch('')
                  }}
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

          {loadingDeals && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#162B60]"></div>
            </div>
          )}

          {!loadingDeals && dealsError && (
            <div className="text-center py-20">
              <p className="text-red-500">{dealsError}</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-[#162B60] text-white rounded-lg">
                Try Again
              </button>
            </div>
          )}

          {!loadingDeals && !dealsError && filteredDeals.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No deals found matching your criteria.</p>
            </div>
          )}

          {!loadingDeals && !dealsError && filteredDeals.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ── Section 2 Component (Upsell Section) ─────────────────────────────────
function Section2({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #eef1fb 0%, #f5f0ff 60%, #eaf4ff 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 leading-tight">
            Why Our Suppliers Are Trusted
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed sm:max-w-xs sm:text-right">
            All suppliers listed are reviewed for legitimacy, business registration, and export capability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {['✓ Business Verified', '✓ Export Ready', '✓ Direct Communication', '✓ No Middlemen'].map((pill) => (
            <span key={pill}
              className="bg-white text-slate-600 text-[12px] sm:text-[14px] font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-center shadow-sm">
              {pill}
            </span>
          ))}
        </div>

        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 sm:px-10 py-8 sm:py-12"
          style={{ background: 'linear-gradient(130deg, #B7B7FF 0%, #c6c6ff 40%, #FFFFFF 100%)' }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
            <div className="flex flex-col items-start">
              <h3 className="text-xl sm:text-2xl lg:text-[40px] font-extrabold text-slate-800 leading-snug mb-2 sm:mb-3">
                Start Sourcing Directly from<br />Panama Today
              </h3>
              <p className="text-slate-700 text-sm sm:text-[15px] font-semibold leading-relaxed">
                Get access to verified suppliers and wholesale deals instantly.
              </p>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
              <img src={sourcing_illustrator} alt="" className="w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] object-contain" />
            </div>
          </div>

          <div className="mt-2 sm:mt-8 flex justify-center">
            <Link
              to="/pricing"
              className={`group flex items-center justify-center gap-2 lg:px-10 
                py-2.5 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200
                bg-[#162B60] text-white hover:bg-[#162B60]`}
            >
              Unlock Access Now
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
                transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]`}>
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #a5b4fc 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-1/3 w-36 sm:w-48 h-36 sm:h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', transform: 'translateY(40%)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Section 3 Component (Upsell Section 2) ───────────────────────────────
function Section3({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #eef1fb 0%, #f5f0ff 60%, #eaf4ff 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 leading-tight">
            Why Our Suppliers Are Trusted
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed sm:max-w-xs sm:text-right">
            All suppliers listed are reviewed for legitimacy, business registration, and export capability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {['✓ Business Verified', '✓ Export Ready', '✓ Direct Communication', '✓ No Middlemen'].map((pill) => (
            <span key={pill}
              className="bg-white text-slate-600 text-[12px] sm:text-[14px] font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-center shadow-sm">
              {pill}
            </span>
          ))}
        </div>

        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 sm:px-10 py-8 sm:py-12"
          style={{ background: 'linear-gradient(130deg, #B7B7FF 0%, #c6c6ff 40%, #FFFFFF 100%)' }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
            <div className="flex flex-col items-start">
              <h3 className="text-xl sm:text-2xl lg:text-[40px] font-extrabold text-slate-800 leading-snug mb-2 sm:mb-3">
                Start Sourcing Directly from<br />Panama Today
              </h3>
              <p className="text-slate-700 text-sm sm:text-[15px] font-semibold leading-relaxed">
                Get access to verified suppliers and wholesale deals instantly.
              </p>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
              <img src={sourcing_illustrator} alt="" className="w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] object-contain" />
            </div>
          </div>

          <div className="mt-2 sm:mt-8 flex justify-center">
            <Link
              to="/pricing"
              className={`group flex items-center justify-center gap-2 lg:px-10 
                py-2.5 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200
                bg-[#162B60] text-white hover:bg-[#162B60]`}
            >
              Unlock Access Now
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
                transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]`}>
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #a5b4fc 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-1/3 w-36 sm:w-48 h-36 sm:h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', transform: 'translateY(40%)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Main Deals Component ─────────────────────────────────────────────────
const TOTAL_SECTIONS = 3

export default function Deals() {
  const [currentSection, setCurrentSection] = useState(0)
  const [leavingUp, setLeavingUp] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const isAnimatingRef = useRef(false)
  const sectionRef = useRef(0)
  const wheelCooldown = useRef(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // Scroll-based navigation - only triggers when scrolling past boundaries
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

      // Scrolling down and at the bottom of current section
      if (e.deltaY > 0 && isAtBottom) {
        e.preventDefault()
        goNextRef.current()
        wheelCooldown.current = true
        setTimeout(() => {
          wheelCooldown.current = false
        }, 800)
      }
      // Scrolling up and at the top of current section
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

  if (isMobile) {
    return (
      <div className="w-full">
        <Section1 isMobile={true} />
        <Section2 isMobile={true} />
        <Section3 isMobile={true} />
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
          {/* Section 0 - Only visible when currentSection is 0 */}
          {currentSection === 0 && (
            <div
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[0] = el;
              }}
              className="h-screen overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <Section1 isMobile={false} />
            </div>
          )}

          {/* Section 1 - Only visible when currentSection is 1 */}
          {currentSection === 1 && (
            <div
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[1] = el;
              }}
              className="h-screen overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <Section2 isMobile={false} />
            </div>
          )}

          {/* Section 2 - Only visible when currentSection is 2 */}
          {currentSection === 2 && (
            <div
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[2] = el;
              }}
              className="h-screen overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <Section3 isMobile={false} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}