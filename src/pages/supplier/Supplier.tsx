import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavbar } from '../../context/NavbarContext'
import dropdown_icon from '../../assets/dropdown_icon.png'
import sourcing_illustrator from '../../assets/souring_illustrator.png'
import { publicService, getImageUrl } from '../../services/publicService';
import type { Category, VendorListItem } from '../../types'

// ── Types ─────────────────────────────────────────────────────────────────
interface Supplier {
  id: number
  name: string
  category: string
  location: string
  logo: string
  logoRound: boolean
  verified: boolean
  premium: boolean
  responds: string
}

const SUPPLIER_TYPES = ['All Types', 'Manufacturer', 'Wholesaler', 'Distributor', 'Exporter']
const LOCATIONS = ['All Locations', 'Panama City', 'Colón', 'Panama Oeste', 'Chiriqui', 'Bocas del Toro', 'Veraguas']
const MOQ_RANGES = ['Any MOQ', 'Under $500', '$500–$2,000', '$2,000–$5,000', '$5,000+']

// ── Verified Badge Icon ───────────────────────────────────────────────────
function VerifiedBadgeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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

// ── Regular Supplier Card ─────────────────────────────────────────────────
function SupplierCard({ supplier, featured = false }: { supplier: Supplier; featured?: boolean }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-md
        transition-all duration-300 hover:-translate-y-0.5 flex flex-col overflow-hidden"
      style={{ boxShadow: '0 2px 12px 0 rgba(60,80,140,0.07)' }}
    >
      {/* Verified badge */}
      <div className="flex items-center justify-center gap-1.5 pt-5 pb-1">
        {supplier.verified ? (
          <div className="flex items-center gap-1 text-red-500 text-[13px] sm:text-[15px] font-semibold">
            <VerifiedBadgeIcon className="w-4 h-4" />
            Verified Supplier
          </div>
        ) : (
          <div className="text-slate-300 text-[11px]">Unverified</div>
        )}
      </div>

      {/* Logo */}
      <div className="flex justify-center mt-3 mb-3 px-4">
        <div className={`w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] flex-shrink-0 overflow-hidden
          flex items-center justify-center
          ${supplier.logoRound ? 'rounded-full border border-gray-100 shadow-sm' : 'rounded-full bg-slate-900 shadow-sm'}`}>
          <img
            src={supplier.logo}
            alt={supplier.name}
            draggable={false}
            className={supplier.logoRound ? 'w-full h-full object-cover' : 'w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] object-contain'}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col px-3 sm:px-5 pb-4 sm:pb-5 flex-1">
        <h3 className="font-bold text-slate-800 text-[13px] sm:text-[16px] leading-snug mb-1">
          {supplier.name}
        </h3>

        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-[11px] sm:text-[12px] text-blue-600 font-medium">
            {supplier.responds}
          </span>
        </div>

        <p className="text-slate-400 text-[11px] sm:text-[13px] mb-1">{supplier.category}</p>

        <div className="flex items-center gap-1 text-black text-[11px] sm:text-[12px] mb-4">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {supplier.location}
        </div>

        {/* CTA */}
        <Link
          to={`/supplier/${supplier.id}`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className={`group mt-auto flex items-center justify-center gap-2 w-full
            py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-[13px] font-semibold transition-all duration-200
            ${featured
              ? 'bg-[#162B60] text-white hover:bg-blue-900'
              : 'bg-[#DAEEFF] text-slate-700 hover:bg-[#162B60] hover:text-white'
            }`}
        >
          View Profile
          <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
            transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]`}>
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

// ── Premium (Locked) Supplier Card ────────────────────────────────────────
function PremiumCard({ supplier }: { supplier: Supplier }) {
  return (
    <div
      className="relative rounded-2xl border border-slate-200 overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(135deg, rgba(220,228,255,0.55) 0%, rgba(200,215,255,0.38) 100%)',
        backdropFilter: 'blur(2px)',
        boxShadow: '0 2px 16px 0 rgba(60,80,160,0.10)',
      }}
    >
      {/* Blurred content underneath */}
      <div className="flex flex-col flex-1 blur-[3px] select-none pointer-events-none opacity-70 px-3 sm:px-5 pt-5 pb-5">
        <div className="flex items-center justify-center gap-1 text-red-400 text-[12px] font-semibold mb-3">
          <VerifiedBadgeIcon className="w-4 h-4" />
          Verified Supplier
        </div>
        <div className="flex justify-center mt-1 mb-3">
          <div className="w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] rounded-full overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
            <img src={supplier.logo} alt="" draggable={false} className="w-full h-full object-cover" />
          </div>
        </div>
        <h3 className="font-bold text-slate-700 text-[13px] sm:text-[15px] leading-snug mb-1">{supplier.name}</h3>
        <span className="text-[11px] text-blue-500 font-medium mb-1">{supplier.responds}</span>
        <p className="text-slate-400 text-[11px] sm:text-[12px] mb-1">{supplier.category}</p>
        <div className="flex items-center gap-1 text-slate-400 text-[11px] sm:text-[12px]">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {supplier.location}
        </div>
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div
          className="flex flex-col items-center gap-2 bg-white/70 backdrop-blur-md
            border border-white/80 rounded-2xl px-5 py-[100%] px-[100%] shadow-lg mx-4"
          style={{ boxShadow: '0 4px 24px 0 rgba(60,80,160,0.13)' }}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-slate-700 text-[16px] font-bold text-center">Go Premium</p>
        </div>
      </div>
    </div>
  )
}

// ── Scroll Isolator (desktop only) ────────────────────────────────────────
function ScrollIsolator({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isMobile) return
    const el = ref.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const atTop = scrollTop === 0 && e.deltaY < 0
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0
    if (!atTop && !atBottom) e.stopPropagation()
  }

  return (
    <div
      ref={ref}
      onWheel={handleWheel}
      className={isMobile ? '' : 'overflow-y-auto'}
      style={isMobile ? {} : { scrollbarWidth: 'none' }}
    >
      {children}
    </div>
  )
}

// ── Supplier Grid Section ─────────────────────────────────────────────────
function SupplierGridSection({ isMobile }: { isMobile: boolean }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [supplierType, setSupplierType] = useState('All Types')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [moq, setMoq] = useState('Any MOQ')

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [apiSuppliers, setApiSuppliers] = useState<VendorListItem[]>([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [suppliersError, setSuppliersError] = useState('');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await publicService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoadingSuppliers(true);

        const filters: any = {
          page: 1
        };

        if (selectedCategory !== 'All') {
          const categoryObj = categories.find(c => c.name === selectedCategory);
          if (categoryObj) {
            filters.category_id = categoryObj.id;
          }
        }

        if (selectedLocation !== 'All Locations') {
          filters.location = selectedLocation;
        }

        const response = await publicService.getVendors(filters);
        setApiSuppliers(response.data);
        setSuppliersError('');
      } catch (error) {
        console.error('Failed to load suppliers', error);
        setSuppliersError('Failed to load suppliers. Please try again.');
      } finally {
        setLoadingSuppliers(false);
      }
    };

    if (categories.length > 0 || selectedCategory === 'All') {
      fetchSuppliers();
    }
  }, [selectedCategory, selectedLocation, categories]);

  // Convert API vendor to Supplier interface
  const mapVendorToSupplier = (vendor: VendorListItem, _index: number): Supplier => {
    // Determine premium status - you can customize this logic
    const isPremium = vendor.id % 3 === 0;

    return {
      id: vendor.id,
      name: vendor.business_name,
      category: vendor.category?.name || 'Uncategorized',
      location: vendor.location,
      logo: getImageUrl(vendor.image_path),
      logoRound: true,
      verified: vendor.status === 'approved',
      premium: isPremium,
      responds: 'Responds in 24 hrs',
    };
  };

  // Apply search filter
  const filteredSuppliers = apiSuppliers
    .filter(vendor => {
      if (search) {
        const searchLower = search.toLowerCase();
        return vendor.business_name.toLowerCase().includes(searchLower) ||
          (vendor.category?.name || '').toLowerCase().includes(searchLower) ||
          (vendor.about || '').toLowerCase().includes(searchLower);
      }
      return true;
    })
    .map((vendor, index) => mapVendorToSupplier(vendor, index));

  const dropdownClass = `appearance-none bg-white border border-gray-200 rounded-[10px]
    pl-3 pr-8 py-2 text-xs sm:text-sm text-slate-600 font-medium w-full
    focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all`

  return (
    <div
      className={`min-h-screen pb-10 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #E8DDFF 0%, #f5f0ff 60%, #FFFFFF 100%)' }}
    >
      {/* ── Header ── */}
      <div className="pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-16 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-800 leading-tight">
            Explore Verified Panama<br />Suppliers
          </h1>
          <p className="text-gray-400 font-semibold text-xs sm:text-sm leading-relaxed sm:text-right sm:max-w-xs">
            Connect directly with trusted manufacturers, exporters,
            and distributors across multiple industries in Panama.
          </p>
        </div>

        {/* Search */}
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

        {/* Filters */}
        <div className="max-w-7xl mx-auto mt-4 sm:mt-6">
          <div className="bg-white/50 rounded-xl p-3 sm:p-4">
            <div className="flex justify-between flex-wrap">
              <div className='flex justify-between flex-wrap items-center gap-2 sm:gap-3'>
                {/* Category */}
                <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`${dropdownClass}`}
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

                {/* Supplier Type */}
                <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                  <select value={supplierType} onChange={(e) => setSupplierType(e.target.value)} className={`${dropdownClass}`}>
                    {SUPPLIER_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                </div>

                {/* Location */}
                <div className="relative flex-1 min-w-[120px] sm:flex-none sm:w-auto">
                  <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className={`${dropdownClass}`}>
                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                  </select>
                  <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                </div>

                {/* MOQ */}
                <div className="relative flex-1 min-w-[110px] sm:flex-none sm:w-auto">
                  <select value={moq} onChange={(e) => setMoq(e.target.value)} className={`${dropdownClass}`}>
                    {MOQ_RANGES.map(m => <option key={m}>{m}</option>)}
                  </select>
                  <img src={dropdown_icon} alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSupplierType('All Types');
                  setSelectedLocation('All Locations');
                  setMoq('Any MOQ');
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
      </div>

      {/* Cards grid */}
      <ScrollIsolator isMobile={isMobile}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-0 pb-16">
          {/* Loading state */}
          {loadingSuppliers && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#162B60]"></div>
            </div>
          )}

          {/* Error state */}
          {!loadingSuppliers && suppliersError && (
            <div className="text-center py-20">
              <p className="text-red-500">{suppliersError}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-[#162B60] text-white rounded-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No results state */}
          {!loadingSuppliers && !suppliersError && filteredSuppliers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No suppliers found matching your criteria.</p>
            </div>
          )}

          {/* Suppliers grid */}
          {!loadingSuppliers && !suppliersError && filteredSuppliers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredSuppliers.map((supplier, index) => (
                supplier.premium ? (
                  <PremiumCard key={supplier.id} supplier={supplier} />
                ) : (
                  <SupplierCard key={supplier.id} supplier={supplier} featured={index === 0} />
                )
              ))}
            </div>
          )}
        </div>
      </ScrollIsolator>
    </div>
  )
}

// ── Upsell Section ────────────────────────────────────────────────────────
function UpsellSection({ isMobile }: { isMobile: boolean }) {
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
            All suppliers listed are reviewed for legitimacy, business
            registration, and export capability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {['✓ Business Verified', '✓ Export Ready', '✓ Direct Communication', '✓ No Middlemen'].map((pill) => (
            <span key={pill}
              className="bg-white text-slate-600 text-[12px] sm:text-[14px] font-medium
                px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-center shadow-sm">
              {pill}
            </span>
          ))}
        </div>

        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 sm:px-10 py-8 sm:py-12"
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
              <img
                src={sourcing_illustrator}
                alt=""
                className="w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] object-contain"
              />
            </div>
          </div>

          <div className="mt-2 sm:mt-8 flex justify-center">
            <Link
              to="/pricing"
              className="group flex items-center justify-center gap-2 lg:px-10 
                py-2.5 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200
                bg-[#162B60] text-white hover:bg-[#162B60]"
            >
              Unlock Access Now
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
                transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
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

// ── Upsell Section 2 ────────────────────────────────────────────────────────
function UpsellSection2({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #eaf4ff 0%, #f5f0ff 60%, #eef1fb 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 leading-tight">
            Why Our Suppliers Are Trusted
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed sm:max-w-xs sm:text-right">
            All suppliers listed are reviewed for legitimacy, business
            registration, and export capability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {['✓ Business Verified', '✓ Export Ready', '✓ Direct Communication', '✓ No Middlemen'].map((pill) => (
            <span key={pill}
              className="bg-white text-slate-600 text-[12px] sm:text-[14px] font-medium
                px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-center shadow-sm">
              {pill}
            </span>
          ))}
        </div>

        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 sm:px-10 py-8 sm:py-12"
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
              <img
                src={sourcing_illustrator}
                alt=""
                className="w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] object-contain"
              />
            </div>
          </div>

          <div className="mt-2 sm:mt-8 flex justify-center">
            <Link
              to="/pricing"
              className="group flex items-center justify-center gap-2 lg:px-10 
                py-2.5 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200
                bg-[#162B60] text-white hover:bg-[#162B60]"
            >
              Unlock Access Now
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
                transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
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

// ── Main Supplier Page ────────────────────────────────────────────────────
const TOTAL = 3

export default function Supplier() {
  const { setShowNavbar2 } = useNavbar()
  const [currentSection, setCurrentSection] = useState(0)
  const [leavingUp, setLeavingUp] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const isAnimatingRef = useRef(false)
  const sectionRef = useRef(0)
  const wheelCooldown = useRef(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setShowNavbar2(true)
    return () => setShowNavbar2(false)
  }, [setShowNavbar2])

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
    if (sectionRef.current >= TOTAL - 1) return
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

  // Scroll-based navigation
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

  // On mobile: render all sections stacked, normal scroll
  if (isMobile) {
    return (
      <div className="w-full">
        <SupplierGridSection isMobile={true} />
        <UpsellSection isMobile={true} />
        <UpsellSection2 isMobile={true} />
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
              <SupplierGridSection isMobile={false} />
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
              <UpsellSection isMobile={false} />
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
              <UpsellSection2 isMobile={false} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}