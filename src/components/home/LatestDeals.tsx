import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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
}

// ── Mock data ─────────────────────────────────────────────────────────────
const deals: Deal[] = [
  {
    id: 1,
    title: 'Bulk Coffee Beans',
    category: 'Food & Beverage',
    moq: '500 kg',
    priceRange: '$4.20 – $4.80 / kg',
    location: 'Panama City',
    verified: true,
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
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
    ],
  },
   
  {
    id: 5,
    title: 'Handmade Leather Bags',
    category: 'Fashion',
    moq: '50 pcs',
    priceRange: '$18.00 – $25.00',
    location: 'David',
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    ],
  },
  {
    id: 6,
    title: 'Organic Honey Jars',
    category: 'Food & Beverage',
    moq: '200 units',
    priceRange: '$3.50 – $5.00 / jar',
    location: 'Chiriqui',
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80',
    ],
  },
  {
    id: 7,
    title: 'Bulk Coffee Beans',
    category: 'Food & Beverage',
    moq: '500 kg',
    priceRange: '$4.20 – $4.80 / kg',
    location: 'Panama City',
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    ],
  },
  {
    id: 8,
    title: 'Cotton T-Shirts',
    category: 'Apparel',
    moq: '1,000 pcs',
    priceRange: '$2.10 – $2.60 / piece',
    location: 'Colón',
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    ],
  },
  {
    id: 9,
    title: 'LED Smart Lights',
    category: 'Electronics',
    moq: '300 units',
    priceRange: '$9.50 – $12.00',
    location: 'Panama Oeste',
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
    ],
  },
   
  {
    id: 10,
    title: 'Handmade Leather Bags',
    category: 'Fashion',
    moq: '50 pcs',
    priceRange: '$18.00 – $25.00',
    location: 'David',
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    ],
  },
  {
    id: 11,
    title: 'Organic Honey Jars',
    category: 'Food & Beverage',
    moq: '200 units',
    priceRange: '$3.50 – $5.00 / jar',
    location: 'Chiriqui',
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80',
    ],
  },
]

// ── DealCard ──────────────────────────────────────────────────────────────
function DealCard({ deal }: { deal: Deal }) {
  const [imgIndex, setImgIndex] = useState<number>(0)

  const goTo = (i: number) => setImgIndex(i)

  return (
    // card: 2px padding each side, fully rounded, square-ish
    <div className="flex-shrink-0 w-[300px] sm:w-[250px] md:w-[260px] lg:w-[270px] xl:w-[280px]
      bg-white rounded-3xl overflow-hidden border border-gray-100
      shadow-sm hover:shadow-lg transition-shadow duration-300 p-[10px] ">

      <div className="rounded-3xl overflow-hidden h-full flex flex-col">

        {/* ── Image area: equal width & height (square) ── */}
        <div className="relative w-full overflow-hidden rounded-3xl"
          style={{ aspectRatio: '1 / 1' }}>

          {/* All images stacked, fade between them */}
          {deal.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={deal.title}
              draggable={false}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                i === imgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}

          {/* Dot indicators */}
          {deal.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {deal.images.map((_, i) => (
                <button
                  key={i}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => goTo(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === imgIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/55'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="pt-3 pb-3 flex flex-col flex-1">

          {/* Title + category */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-slate-800 text-[16px] sm:text-[16px] leading-snug">
              {deal.title}
            </h3>
            <span className="text-[10px] sm:text-[11px] text-slate-400 whitespace-nowrap mt-0.5 flex-shrink-0">
              {deal.category}
            </span>
          </div>

          {/* MOQ */}
          <div className="flex items-center justify-between text-[11px] sm:text-[12px] mb-2">
            <span className="text-slate-500 text-[14px] font-semibold">MOQ</span>
            <span className="text-blue-600  text-[14px] font-semibold">{deal.moq}</span>
          </div>

          {/* Price Range */}
          <div className="flex items-center justify-between text-[11px] sm:text-[12px] mb-3">
            <span className="text-slate-500 text-[14px] font-semibold">Price Range</span>
            <span className="text-slate-700 font-medium">{deal.priceRange}</span>
          </div>

          {/* Location + verified */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 text-slate-500 text-[14px] font-semibold sm:text-[11px]">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {deal.location}
            </div>
            {deal.verified && (
              <svg className="w-6 h-6 text-red-500 flex-shrink-0"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            )}
          </div>

          {/* CTA — icon rotates on hover */}
          <Link
            to="/deals"
            onMouseDown={(e) => e.stopPropagation()}
            className="group mt-auto flex items-center justify-center gap-2 w-full
              py-2 sm:py-2.5 rounded-xl border border-slate-200
              hover:bg-[#162B60] hover:border-[#162B60] hover:text-white
              text-slate-700 text-[12px] sm:text-[13px] font-medium
              transition-all duration-200 bg-[#C3E8FF]"
          >
            Request Quote
            {/* icon rotates 45° on hover */}
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

// ── Main component ────────────────────────────────────────────────────────
const LatestDeals = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  const CARD_WIDTH = 280 + 20  // max card width + gap

  // ── Next button ──
  const scrollNext = () => {
    trackRef.current?.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' })
  }

  // ── Mouse drag ──
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
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.3
    trackRef.current.scrollLeft = scrollStart.current - walk
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  // ── Touch drag ──
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    isDragging.current = true
    startX.current = e.touches[0].pageX
    scrollStart.current = trackRef.current.scrollLeft
  }
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return
    const walk = (e.touches[0].pageX - startX.current) * 1.3
    trackRef.current.scrollLeft = scrollStart.current - walk
  }
  const onTouchEnd = () => { isDragging.current = false }

  return (
    <section className="w-full py-20 sm:py-16 bg-white overflow-hidden">

      {/* Header: pl-5 (20px) on large, equal on small */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-5 lg:pl-8 lg:pr-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">
          Latest Wholesale Deals from Panama
        </h2>

        <button
          onClick={scrollNext}
          className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-[#162B60] hover:bg-blue-800
            text-white flex items-center justify-center shadow-md
            transition-colors duration-200 flex-shrink-0 ml-4"
          aria-label="Next deals"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/*
        Carousel track:
        - pl-5 (20px) left padding on lg+, equal padding on small screens
        - no right padding so cards bleed to edge
        - no scrollbar
      */}
      <div
        ref={trackRef}
        className="flex gap-10 overflow-x-auto pb-2 select-none
          pl-2 sm:pl-5 lg:pl-8"
        style={{
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <style>{`
          .deals-track::-webkit-scrollbar { display: none; }
        `}</style>

        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}

        {/* Right-edge breathing room */}
        <div className="flex-shrink-0 w-6 sm:w-5" />
      </div>

    </section>
  )
}

export default LatestDeals