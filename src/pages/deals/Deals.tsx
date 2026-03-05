import { useParams, Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

import supplier_profile from '../../assets/supplier_details.png'
import verified_badge from '../../assets/verified_tick_.png'
import recent_icon from '../../assets/recent_icon.svg'
import star_icon from '../../assets/star_icon.png'
import arrow_left_icon from '../../assets/arrow_left_icon.svg'
import dropdown_icon from '../../assets/dropdown_icon.png'
import sourcing_illustrator from '../../assets/souring_illustrator.png'

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
  isPremium?: boolean // Flag for premium cards
}

// ── Mock data with premium flag ───────────────────────────────────────────
const deals: Deal[] = [
  {
    id: 1,
    title: 'Bulk Coffee Beans',
    category: 'Food & Beverage',
    moq: '500 kg',
    priceRange: '$4.20 – $4.80 / kg',
    location: 'Panama City',
    verified: true,
    isPremium: false,
    images: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    ],
  },
  {
    id: 2,
    title: 'Cotton T-Shirts',
    category: 'Apparel',
    moq: '1,000 pcs',
    priceRange: '$2.10 – $2.60 / piece',
    location: 'Colón',
    verified: true,
    isPremium: true,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    ],
  },
  {
    id: 3,
    title: 'LED Smart Lights',
    category: 'Electronics',
    moq: '300 units',
    priceRange: '$9.50 – $12.00',
    location: 'Panama Oeste',
    verified: true,
    isPremium: false,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
    ],
  },
  {
    id: 4,
    title: 'Handmade Leather Bags',
    category: 'Fashion',
    moq: '50 pcs',
    priceRange: '$18.00 – $25.00',
    location: 'David',
    verified: true,
    isPremium: true,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    ],
  },
  {
    id: 5,
    title: 'Organic Honey Jars',
    category: 'Food & Beverage',
    moq: '200 units',
    priceRange: '$3.50 – $5.00 / jar',
    location: 'Chiriqui',
    verified: true,
    isPremium: false,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80',
    ],
  },
  {
    id: 6,
    title: 'Premium Coffee Beans',
    category: 'Food & Beverage',
    moq: '250 kg',
    priceRange: '$8.50 – $12.00 / kg',
    location: 'Boquete',
    verified: true,
    isPremium: true,
    images: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    ],
  },
  {
    id: 7,
    title: 'Designer T-Shirts',
    category: 'Apparel',
    moq: '500 pcs',
    priceRange: '$5.50 – $8.00 / piece',
    location: 'Panama City',
    verified: true,
    isPremium: true,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    ],
  },
  {
    id: 8,
    title: 'Smart Home Hub',
    category: 'Electronics',
    moq: '150 units',
    priceRange: '$25.00 – $35.00',
    location: 'David',
    verified: true,
    isPremium: false,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
    ],
  },
]

const CATEGORIES = ['All', 'Food & Beverage', 'Apparel', 'Electronics', 'Packaging & Materials', 'Beauty & Personal Care', 'Metals', 'Automotive', 'Healthcare', 'Handicrafts', 'Logistics', 'Marine & Fishing']
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
            <svg
              className="w-8 h-8 transition-transform duration-300 group-hover:rotate-310 bg-[#CFF6FF] rounded-full text-black p-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Section 1 Component (Deals Grid) ────────────────────────────────────
function Section1({ onNext, isMobile }: { onNext: () => void; isMobile: boolean }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [supplierType, setSupplierType] = useState('All Types')
  const [location, setLocation] = useState('All Locations')
  const [moq, setMoq] = useState('Any MOQ')

  const dropdownClass = `appearance-none bg-white border border-gray-200 rounded-[10px]
    pl-3 pr-8 py-2 text-xs sm:text-sm text-slate-600 font-medium w-full
    focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all`

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) return
    const target = e.target as HTMLElement
    const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .no-section-click')
    if (!isInteractive) onNext()
  }

  return (
    <div
      className={`min-h-screen ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #eef1fb 60%, #FFFFFF 100%)' }}
      onClick={handleClick}
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
          {/* Search */}
          <div className="no-section-click max-w-4xl mx-auto mt-4 sm:mt-5"
            onClick={(e) => e.stopPropagation()}>
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

          {/* Filters */}
          <div className="no-section-click max-w-7xl mx-auto mt-4 sm:mt-6 my-6"
            onClick={(e) => e.stopPropagation()}>
            <div className="bg-white/50 rounded-xl p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className={dropdownClass}>
                      <option value="All">Category</option>
                      {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
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

          {/* Grid Layout for Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 2 Component (Upsell Section) ─────────────────────────────────
function Section2({ onPrev, onNext, isMobile }: { onPrev: () => void; onNext: () => void; isMobile: boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) return
    const target = e.target as HTMLElement
    const isInteractive = target.closest('a, button, input, select, [role="button"], .no-section-click')
    if (!isInteractive) {
      if (e.clientY < window.innerHeight / 2) {
        onPrev()
      } else {
        onNext()
      }
    }
  }

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(160deg, #eef1fb 0%, #f5f0ff 60%, #eaf4ff 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-7xl mx-auto">

        {/* Why Trusted */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 leading-tight">
            Why Our Suppliers Are Trusted
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed sm:max-w-xs sm:text-right">
            All suppliers listed are reviewed for legitimacy, business
            registration, and export capability.
          </p>
        </div>

        {/* Trust pills — 2 cols on mobile, 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {['✓ Business Verified', '✓ Export Ready', '✓ Direct Communication', '✓ No Middlemen'].map((pill) => (
            <span key={pill}
              className="bg-white text-slate-600 text-[12px] sm:text-[14px] font-medium
                px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-center shadow-sm">
              {pill}
            </span>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 sm:px-10 py-8 sm:py-12"
          style={{ background: 'linear-gradient(130deg, #B7B7FF 0%, #c6c6ff 40%, #FFFFFF 100%)' }}
        >
          {/* Text + Image row */}
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
              <img
                src={sourcing_illustrator}
                alt=""
                className="w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] object-contain"
              />
            </div>
          </div>

          {/* Button centered below */}
          <div className="mt-2 sm:mt-8 flex justify-center">
            <Link
              to="/pricing"
              onClick={(e) => e.stopPropagation()}
              className="no-section-click inline-flex items-center gap-3 bg-[#162B60] hover:bg-blue-900
                text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-[15px]
                transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Unlock Access Now
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Blobs */}
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
function Section3({ onPrev, isMobile }: { onPrev: () => void; isMobile: boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) return
    const target = e.target as HTMLElement
    const isInteractive = target.closest('a, button, input, select, [role="button"], .no-section-click')
    if (!isInteractive) onPrev()
  }

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(160deg, #eef1fb 0%, #f5f0ff 60%, #eaf4ff 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-7xl mx-auto">

        {/* Why Trusted */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 leading-tight">
            Why Our Suppliers Are Trusted
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed sm:max-w-xs sm:text-right">
            All suppliers listed are reviewed for legitimacy, business
            registration, and export capability.
          </p>
        </div>

        {/* Trust pills — 2 cols on mobile, 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {['✓ Business Verified', '✓ Export Ready', '✓ Direct Communication', '✓ No Middlemen'].map((pill) => (
            <span key={pill}
              className="bg-white text-slate-600 text-[12px] sm:text-[14px] font-medium
                px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-center shadow-sm">
              {pill}
            </span>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 sm:px-10 py-8 sm:py-12"
          style={{ background: 'linear-gradient(130deg, #B7B7FF 0%, #c6c6ff 40%, #FFFFFF 100%)' }}
        >
          {/* Text + Image row */}
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
              <img
                src={sourcing_illustrator}
                alt=""
                className="w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] object-contain"
              />
            </div>
          </div>

          {/* Button centered below */}
          <div className="mt-2 sm:mt-8 flex justify-center">
            <Link
              to="/pricing"
              onClick={(e) => e.stopPropagation()}
              className="no-section-click inline-flex items-center gap-3 bg-[#162B60] hover:bg-blue-900
                text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-[15px]
                transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Unlock Access Now
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Blobs */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #a5b4fc 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-1/3 w-36 sm:w-48 h-36 sm:h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', transform: 'translateY(40%)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Main SupplierDetails Component ───────────────────────────────────────
const TOTAL_SECTIONS = 3

export default function Deals() {
  const { id } = useParams()
  const [section, setSection] = useState(0)
  const [leavingUp, setLeavingUp] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const isAnimatingRef = useRef(false)
  const sectionRef = useRef(0)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const updateSection = (n: number) => {
    sectionRef.current = n
    setSection(n)
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

  // Arrow keys — desktop only
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isMobile) return
      if (e.key === 'ArrowDown') goNextRef.current()
      else if (e.key === 'ArrowUp') goPrevRef.current()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isMobile])

  // On mobile: render all sections stacked, normal scroll
  if (isMobile) {
    return (
      <div className="w-full">
        <Section1 onNext={goNext} isMobile={true} />
        <Section2 onPrev={goPrev} onNext={goNext} isMobile={true} />
        <Section3 onPrev={goPrev} isMobile={true} />
      </div>
    )
  }

  // Desktop: section-by-section with animation
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
          {section === 0 && <Section1 onNext={goNext} isMobile={false} />}
          {section === 1 && <Section2 onPrev={goPrev} onNext={goNext} isMobile={false} />}
          {section === 2 && <Section3 onPrev={goPrev} isMobile={false} />}
        </div>
      </div>
    </>
  )
}