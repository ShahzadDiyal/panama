import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { publicService, getImageUrl } from '../../services/publicService'
import type { VendorListItem } from '../../types'
// ── Types ─────────────────────────────────────────────────────────────────
interface Supplier {
  id: number
  name: string // maps to business_name
  category: string // from category.name
  location: string
  logo: string // from image_path
  logoRound: boolean // keep as true for all or based on image type
}

// ── Mock data ─────────────────────────────────────────────────────────────
// const suppliers: Supplier[] = [
//   {
//     id: 1,
//     name: 'Panama Agro Exports',
//     category: 'Food & Beverage',
//     location: 'Panama City',
//     logo: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=200&q=80',
//     logoRound: true,
//   },
//   {
//     id: 2,
//     name: 'Colón Textile Group',
//     category: 'Apparel',
//     location: 'Colón',
//     logo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&q=80',
//     logoRound: true,
//   },
//   {
//     id: 3,
//     name: 'Pacific Tech Distributors',
//     category: 'Electronics',
//     location: 'Panama Oeste',
//     logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80',
//     logoRound: true,
//   },
//   {
//     id: 4,
//     name: 'Canal Zone Packaging Ltd.',
//     category: 'Packaging & Materials',
//     location: 'Panama City',
//     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Canal%2B_2019.svg/500px-Canal%2B_2019.svg.png',
//     logoRound: false,
//   },
//   {
//     id: 5,
//     name: 'Tropic Beauty Exports',
//     category: 'Beauty & Personal Care',
//     location: 'Chiriqui',
//     logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80',
//     logoRound: false,
//   },
//   {
//     id: 6,
//     name: 'Bocas del Toro Organics',
//     category: 'Food & Beverage',
//     location: 'Bocas del Toro',
//     logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80',
//     logoRound: true,
//   },
// ]

// ── VerifiedBadge icon ────────────────────────────────────────────────────
function VerifiedBadgeIcon() {
  return (
    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor"
      viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0
           3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946
           3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138
           3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806
           3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438
           3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

// ── SupplierCard ──────────────────────────────────────────────────────────
function SupplierCard({ supplier,  }: { supplier: Supplier; featured?: boolean }) {


  return (
    // ↓ Outer wrapper: same p-[10px] + rounded-3xl as LatestDeals cards
    <div className="flex-shrink-0 w-[300px] sm:w-[225px] lg:w-[240px] xl:w-[250px]
      bg-white rounded-3xl overflow-hidden border border-gray-100
      shadow-sm hover:shadow-lg transition-shadow duration-300 p-[10px]">

      {/* Inner wrapper — same rounded-3xl inner as LatestDeals */}
      <div className="rounded-3xl overflow-hidden h-full flex flex-col px-3 pt-3 pb-3">

        {/* Verified label */}
        <div className="flex items-center text-center justify-center gap-1.5 text-red-500 text-[12px] font-semibold mb-4">
          <VerifiedBadgeIcon />
          Verified Supplier
        </div>

        {/* Logo / Avatar */}
        <div className="flex justify-center mb-4">
          {supplier.logoRound ? (
            <div className="w-[90px] h-[90px] rounded-full overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
              <img
                src={supplier.logo}
                alt={supplier.name}
                draggable={false}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-[90px] h-[90px] rounded-full bg-slate-900 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
              <img
                src={supplier.logo}
                alt={supplier.name}
                draggable={false}
                className="w-[70px] h-[70px] object-contain"
              />
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-bold text-slate-800 text-[15px] leading-snug mb-1">
          {supplier.name}
        </h3>

        {/* Category */}
        <p className="text-slate-400 text-[12px] mb-1.5">{supplier.category}</p>

        {/* Location */}
        <div className="flex items-center gap-1 text-slate-400 text-[11px] mb-5">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {supplier.location}
        </div>



              
        {/* CTA button */}
        <Link
          to={`/supplier/${supplier.id}`}
          onMouseDown={(e) => e.stopPropagation()}
          className={`group mt-auto flex items-center justify-center gap-2 w-full lg:px-10  
            py-4 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200
            bg-[#162B60] text-white hover:bg-[#162B60] hover:text-white
             `}
        >
          View Profile
         <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
            transition-all duration-300 group-hover:rotate-[-45deg]
              bg-[#B8E4FF]` }>
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>

      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────
const VerifiedSuppliers = () => {
  const [suppliers, setSuppliers] = useState<VendorListItem[]>([])
  const [_loading, setLoading] = useState(true)
  const [_error, setError] = useState('')


  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await publicService.getVendors({ page: 1 })
        setSuppliers(response.data)
      } catch (err) {
        setError('Failed to load suppliers')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSuppliers()
  }, [])




  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  const CARD_WIDTH = 250 + 40  // card width + gap-10 (40px)

  const scrollNext = () => {
    trackRef.current?.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' })
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    isDragging.current = true
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollStart.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const walk = (e.pageX - trackRef.current.offsetLeft - startX.current) * 1.3
    trackRef.current.scrollLeft = scrollStart.current - walk
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    isDragging.current = true
    startX.current = e.touches[0].pageX
    scrollStart.current = trackRef.current.scrollLeft
  }
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return
    trackRef.current.scrollLeft = scrollStart.current - (e.touches[0].pageX - startX.current) * 1.3
  }
  const onTouchEnd = () => { isDragging.current = false }

  return (
    <section className="w-full py-8 sm:py-26 bg-white overflow-hidden">

      {/* Header row — same px as LatestDeals */}
      <div className="flex items-start justify-between mb-6 px-4 sm:px-5 lg:pl-8 lg:pr-8">

        {/* Left: title + subtitle */}
        <div className="max-w-xs sm:max-w-sm">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-2">
            Verified Panama Suppliers
          </h2>
          <p className="text-slate-400 text-[12px] sm:text-[13px] leading-relaxed">
            Suppliers marked as Verified have been reviewed and approved by our team to
            ensure legitimacy, business authenticity, and direct contact access.
          </p>
        </div>

        {/* Right: hint text + next button */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-4">
          <p className="text-slate-300 text-[11px] sm:text-[12px] text-right leading-snug max-w-[160px] hidden sm:block">
            Browse suppliers across key industries. Limited preview available.
          </p>
          <button
            onClick={scrollNext}
            className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-[#162B60] hover:bg-blue-800
              text-white flex items-center justify-center shadow-md
              transition-colors duration-200"
            aria-label="Next suppliers"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel track — same gap-10 + pl-6/pl-8 as LatestDeals */}
      <div
        ref={trackRef}
        className="flex gap-10 overflow-x-auto pb-2 select-none pl-2 sm:pl-5 lg:pl-8"
        style={{ cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {suppliers.map((vendor, index) => (
          <SupplierCard
            key={vendor.id}
            supplier={{
              id: vendor.id,
              name: vendor.business_name,
              category: vendor.category?.name || 'Uncategorized',
              location: vendor.location,
              logo: getImageUrl(vendor.image_path),
              logoRound: true,
            }}
            featured={index === 0}
          />
        ))}

        {/* Right-edge breathing room */}
        <div className="flex-shrink-0 w-6 sm:w-5" />
      </div>

    </section>
  )
}

export default VerifiedSuppliers