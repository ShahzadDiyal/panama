import { useEffect, useRef, useState } from "react"
import HeroSection from "../../components/home/HeroSection"
import LatestDeals from "../../components/home/LatestDeals"
import VerifiedSupplier from "../../components/home/VerifiedSupplier"
import PricingSection from "../../components/home/PricingSection"

// ── StickyInfoBar ─────────────────────────────────────────────────────────
function StickyInfoBar({ visible }: { visible: boolean }) {
  const [category, setCategory] = useState('')
  const [supplierType, setSupplierType] = useState('')
  const [search, setSearch] = useState('')

  return (
    <div
      className={`
        sticky top-16 sm:top-18 lg:top-20 z-30 bg-white
        transition-all duration-300
        px-4 sm:px-6 lg:px-8
        py-3 sm:py-4
        shadow-sm
        ${visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"}
      `}
    >

      {/* ── Row 1: Info columns ── */}
      <div className="border-y border-gray-200">

        {/* Responsive grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-y-3
          gap-x-4
        ">
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
              className="
                flex flex-col items-center text-center
                px-2 sm:px-4 lg:px-6
                py-3
              "
            >
              <h3 className="
                font-semibold text-slate-800
                text-xs sm:text-sm lg:text-base
                mb-1
              ">
                {col.heading}
              </h3>

              <p className="
                text-slate-400
                text-xs sm:text-sm
                leading-snug
                max-w-[260px]
              ">
                {col.subheading}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ── Row 2: Search + filters ── */}
      <div className="
        flex
        flex-col
        lg:flex-row
        gap-3
        mt-4
      ">

        {/* Search */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers, products, or categories"
            className="
              w-full
              pl-4 pr-10 py-2.5
              rounded-full
              border border-gray-300
              text-sm
              focus:outline-none
              focus:border-slate-500
            "
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-slate-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        {/* Filters */}
        <div className="
          flex
          flex-col
          sm:flex-row
          gap-3
          w-full
          lg:w-auto
        ">

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              w-full sm:w-auto
              px-4 py-2.5
              rounded-full
              border border-gray-300
              text-sm
              focus:outline-none
            "
          >
            <option value="">Category</option>
            <option value="food">Food & Beverage</option>
            <option value="apparel">Apparel</option>
            <option value="electronics">Electronics</option>
            <option value="packaging">Packaging</option>
            <option value="beauty">Beauty</option>
            <option value="fashion">Fashion</option>
          </select>

          {/* Supplier Type */}
          <select
            value={supplierType}
            onChange={(e) => setSupplierType(e.target.value)}
            className="
              w-full sm:w-auto
              px-4 py-2.5
              rounded-full
              border border-gray-300
              text-sm
              focus:outline-none
            "
          >
            <option value="">Supplier Type</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="distributor">Distributor</option>
            <option value="exporter">Exporter</option>
          </select>

        </div>

      </div>

    </div>
  )
}

// ── Home ──────────────────────────────────────────────────────────────────
export default function Home() {

  const [barVisible, setBarVisible] = useState(false)

  const dealsRef = useRef<HTMLDivElement>(null)
  const suppliersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some(e => e.isIntersecting)
        setBarVisible(visible)
      },
      {
        root: null,
        threshold: 0.05,
      }
    )

    if (dealsRef.current) observer.observe(dealsRef.current)
    if (suppliersRef.current) observer.observe(suppliersRef.current)

    return () => observer.disconnect()

  }, [])

  return (
    <div className="bg-slate-950 w-full overflow-x-hidden">

      <HeroSection />

      <div className="bg-white">

        <StickyInfoBar visible={barVisible} />

        <div
          ref={dealsRef}
          className="px-4 sm:px-6 lg:px-8"
        >
          <LatestDeals />
        </div>

        <div
          ref={suppliersRef}
          className="px-4 sm:px-6 lg:px-8"
        >
          <VerifiedSupplier />
        </div>

      </div>

      <div className="">
        <PricingSection />
      </div>

    </div>
  )
}