import { useEffect, useRef, useState } from "react"
import HeroSection from "../../components/home/HeroSection"
import LatestDeals from "../../components/home/LatestDeals"
import VerifiedSupplier from "../../components/home/VerifiedSupplier"
import PricingSection from "../../components/home/PricingSection"

// ── StickyInfoBar ─────────────────────────────────────────────────────────
function StickyInfoBar({ visible }: { visible: boolean }) {
  const [category, setCategory] = useState<string>('')
  const [supplierType, setSupplierType] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  return (
    <div
      className={`sticky top-20 z-20 bg-white transition-all duration-300 px-4 sm:px-6 lg:px-8 pb-3 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {/* ── Row 1: 3-col info ── */}
      <div className="border-t border-b border-gray-200 mb-4">
        <div className="grid grid-cols-3 ">
          {[
            {
              heading: 'Browse',
              subheading: 'Browse suppliers and wholesale deals by category.',
            },
            {
              heading: 'Connect',
              subheading: 'Send quote requests or chat directly with suppliers via WhatsApp.',
            },
            {
              heading: 'Unlock',
              subheading: 'Get full access with a Day Pass or subscription.',
            },
          ].map((col, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center  sm:px-6 lg:px-10 py-3 sm:py-4"
            >
              <h3 className="font-semibold text-slate-800 text-[11px] sm:text-[14px] lg:text-[15px] mb-0.5 sm:mb-1">
                {col.heading}
              </h3>
              <p className="text-slate-400 text-[9px] sm:text-[12px] lg:text-[13px] leading-snug max-w-[200px] hidden sm:block">
                {col.subheading}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 2: search left, dropdowns right ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

        {/* Search bar */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers, products, or categories"
            className="w-full pl-5 pr-11 py-2.5 rounded-full border border-gray-200
              text-slate-700 placeholder-slate-400 text-[13px]
              focus:outline-none focus:border-slate-400 transition-colors duration-200"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        {/* Dropdowns row */}
        <div className="flex items-center gap-3 flex-shrink-0">

          {/* Category dropdown */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full border border-gray-200
                text-slate-700 text-[13px] bg-white
                focus:outline-none focus:border-slate-400 transition-colors duration-200
                cursor-pointer min-w-[130px]"
            >
              <option value="">Category</option>
              <option value="food">Food & Beverage</option>
              <option value="apparel">Apparel</option>
              <option value="electronics">Electronics</option>
              <option value="packaging">Packaging</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="fashion">Fashion</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          {/* Supplier Type dropdown */}
          <div className="relative">
            <select
              value={supplierType}
              onChange={(e) => setSupplierType(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full border border-gray-200
                text-slate-700 text-[13px] bg-white
                focus:outline-none focus:border-slate-400 transition-colors duration-200
                cursor-pointer min-w-[145px]"
            >
              <option value="">Supplier Type</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="distributor">Distributor</option>
              <option value="exporter">Exporter</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Home ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [barVisible, setBarVisible] = useState<boolean>(false)

  const dealsRef = useRef<HTMLDivElement>(null)
  const suppliersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      const anyVisible = entries.some((e) => e.isIntersecting)
      if (anyVisible) {
        setBarVisible(true)
      } else {
        // Check if either section is still in view
        const dealsInView =
          dealsRef.current
            ? dealsRef.current.getBoundingClientRect().top < window.innerHeight * 0.9 &&
              dealsRef.current.getBoundingClientRect().bottom > window.innerHeight * 0.1
            : false
        const suppliersInView =
          suppliersRef.current
            ? suppliersRef.current.getBoundingClientRect().top < window.innerHeight * 0.9 &&
              suppliersRef.current.getBoundingClientRect().bottom > window.innerHeight * 0.1
            : false

        if (!dealsInView && !suppliersInView) setBarVisible(false)
      }
    }, options)

    if (dealsRef.current) observer.observe(dealsRef.current)
    if (suppliersRef.current) observer.observe(suppliersRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-slate-950">

      <HeroSection />

      <div className="bg-white">
        {/* Single sticky bar — same content always, shown over both sections */}
        <StickyInfoBar visible={barVisible} />

        <div ref={dealsRef}>
          <LatestDeals />
        </div>

        <div ref={suppliersRef}>
          <VerifiedSupplier />
        </div>
      </div>

      <PricingSection />

    </div>
  )
}