import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavbar } from '../../context/NavbarContext'
import hot_deals from '../../assets/hot_deals.png'
import lock_icon from '../../assets/lock_icon.svg'


export default function DealDetails() {
  const { id } = useParams()
  const { setShowNavbar2 } = useNavbar()
  const [visible, setVisible] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    setShowNavbar2(true)
    return () => setShowNavbar2(false)
  }, [setShowNavbar2])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const deal = {
    id,
    title: 'Premium Arabica Coffee Beans – Bulk Export',
    category: 'Food & Beverage',
    discount: '35% OFF',
    original: '$8.50 per unit',
    price: '$6.20 per unit',
    expires: '3 days',
    supplier: 'Panama Coffee Exports S.A.',
    supplierId: 1,
    location: 'Panama City, Panama',
    description:
      'This limited-time wholesale offer is available directly from a verified Panama exporter. These premium Arabica coffee beans are sourced, processed, and packaged for international wholesale buyers.',
    idealFor: ['Retailers', 'Importers', 'Coffee brands', 'Distributors'],
    moq: '1,000 Units',
    stock: 12,
    verified: true,
    hotDeal: true,
    limitedStock: true,
    images: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80',
    ],
  }

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-left  { animation: slideInLeft  0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-right { animation: slideInRight 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-up    { animation: fadeInUp     0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-delay-1 { animation-delay: 0.08s; }
        .anim-delay-2 { animation-delay: 0.16s; }
        .anim-delay-3 { animation-delay: 0.24s; }
      `}</style>

      <div
        className="min-h-screen px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 sm:pt-24 pb-16"
        style={{ background: 'linear-gradient(160deg, #eef1fb 0%, #f5f0ff 60%, #eaf4ff 100%)' }}
      >
        <div className="max-w-7xl mx-auto  mt-10">

          {/* Desktop Layout (lg and above) - 12 Column Grid */}
          <div className="hidden lg:block">
            {/* Back button - Col 1 (1/12) */}
           

            {/* 12-Column Grid */}
            <div className="grid grid-cols-12 gap-6 justify-center">
               {visible && (
              <div className="anim-up justify-center text-center">
                <Link
                  to="/deals"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full
                    bg-white border border-gray-200 shadow-sm hover:shadow-md
                    text-slate-600 hover:text-slate-900 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </div>
            )}
              {/* Col 2 - Main Image (5/12) */}
              {visible && (
                <div className="col-span-5 anim-left">
                  <div className="relative rounded-2xl overflow-hidden bg-black w-full h-full"
                    style={{ aspectRatio: '4/3',}}>
                    <img
                      src={deal.images[activeImg]}
                      alt={deal.title}
                      className="w-full h-full object-cover transition-all duration-500"
                    />

                    {/* Badges top-left */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {deal.verified && (
                        <span className="flex items-center gap-1.5 backdrop-blur-sm
                          text-white text-[11px] sm:text-xs font-medium px-2.5 py-1.5 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0
                                 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946
                                 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138
                                 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806
                                 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438
                                 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          Verified Supplier
                        </span>
                      )}
                      {deal.hotDeal && (
                        <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm
                          text-white text-[11px] sm:text-xs font-medium px-2.5 py-1.5 rounded-full">
                          <img src={hot_deals} alt="" /> Hot Deal
                        </span>
                      )}
                      {deal.limitedStock && (
                        <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm
                          text-white text-[11px] sm:text-xs font-medium px-2.5 py-1.5 rounded-full">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Limited Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Col 3 - Vertical Thumbnails (2/12) */}
              {visible && (
                <div className="col-span-2 anim-up anim-delay-1">
                  <div className="flex flex-col gap-8">
                    {deal.images.slice(1).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i + 1)}
                        className={`rounded-[30px] overflow-hidden transition-all duration-200 w-full
                          ${activeImg === i + 1
                            ? 'ring-2 ring-[#162B60] shadow-md scale-[1.02]'
                            : 'opacity-80 hover:opacity-100 hover:shadow-sm'
                          }`}
                        style={{ aspectRatio: '1/1' }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Col 4 - Right Content (4/12) */}
              {visible && (
                <div className="col-span-4 anim-right flex flex-col gap-4">
                  {/* Title + description */}
                  <div>
                    <h1 className="text-xl lg:text-[24px] font-semibold text-slate-800 leading-snug mb-2">
                      {deal.title}
                    </h1>
                    <p className="text-slate-500 text-[14px] font-medium leading-relaxed">
                      {deal.description}
                    </p>
                  </div>

                  {/* Ideal for */}
                  <div>
                    <p className="text-slate-700 text-sm font-semibold mb-1.5">Ideal for:</p>
                    <ul className="space-y-1">
                      {deal.idealFor.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-[24px] font-medium text-slate-800">
                      {deal.price}
                    </span>
                    <span className="text-sm text-slate-400 font-medium line-through">{deal.original}</span>
                  </div>

                  {/* Meta */}
                  <div className="space-y-1.5 text-sm text-slate-600">
                    <div>
                      <span className="font-medium text-slate-700">Minimum Order Quantity (MOQ): <br /></span>
                      {deal.moq}
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Supplier: <br /> </span>
                      <Link
                        to={`/supplier/${deal.supplierId}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        {deal.supplier}
                      </Link>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Location: <br /></span>
                      {deal.location}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 mt-2">
                    <button
                      className="flex items-center justify-between gap-3 px-5 py-3 rounded-full
                        bg-[#C3E8FF] hover:bg-[#162B60] text-slate-700 hover:text-white
                        font-semibold text-[16px] transition-all duration-200 group"
                    >
                      Contact via WhatsApp
                      <span className="w-7 h-7 rounded-full bg-white/60 group-hover:bg-white/20
                        flex items-center justify-center flex-shrink-0 transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>

                    <button
                      className="flex items-center justify-between gap-3 px-5 py-3 rounded-full
                        bg-[#C3E8FF] hover:bg-[#162B60] text-slate-700 hover:text-white
                        font-semibold text-[16px] transition-all duration-200 group"
                    >
                      Request Quote
                      <span className="w-7 h-7 rounded-full group-hover:bg-white/20
                        flex items-center justify-center flex-shrink-0 transition-all">
                       <img src={lock_icon} alt="" />
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Layout (below lg) */}
          <div className="lg:hidden">
            {/* Back button */}
            {visible && (
              <div className="anim-up mb-4">
                <Link
                  to="/deals"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full
                    bg-white border border-gray-200 shadow-sm hover:shadow-md
                    text-slate-600 hover:text-slate-900 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Main Image */}
            {visible && (
              <div className="anim-left w-full mb-4">
                <div className="relative rounded-2xl overflow-hidden bg-black w-full"
                  style={{ aspectRatio: '16/9' }}>
                  <img
                    src={deal.images[activeImg]}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {deal.verified && (
                      <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm
                        text-white text-[11px] font-medium px-2.5 py-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Verified
                      </span>
                    )}
                    {deal.hotDeal && (
                      <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm
                        text-white text-[11px] font-medium px-2.5 py-1.5 rounded-full">
                        🔥 Hot Deal
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Horizontal Thumbnails for Mobile */}
            {visible && (
              <div className="anim-up anim-delay-1 flex flex-row gap-3 overflow-x-auto pb-2 mb-4">
                {deal.images.slice(1).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i + 1)}
                    className={`rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200
                      ${activeImg === i + 1
                        ? 'ring-2 ring-[#162B60] shadow-md'
                        : 'opacity-80 hover:opacity-100'
                      }`}
                    style={{ width: '80px', height: '80px' }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Right Content for Mobile */}
            {visible && (
              <div className="anim-right flex flex-col gap-4">
                {/* Title + description */}
                <div>
                  <h1 className="text-xl font-extrabold text-slate-800 leading-snug mb-2">
                    {deal.title}
                  </h1>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {deal.description}
                  </p>
                </div>

                {/* Ideal for */}
                <div>
                  <p className="text-slate-700 text-sm font-semibold mb-1.5">Ideal for:</p>
                  <ul className="space-y-1">
                    {deal.idealFor.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-slate-800">
                    {deal.price}
                  </span>
                  <span className="text-sm text-slate-400 line-through">{deal.original}</span>
                </div>

                {/* Meta */}
                <div className="space-y-1.5 text-sm text-slate-600">
                  <div>
                    <span className="font-medium text-slate-700">MOQ: </span>
                    {deal.moq}
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Supplier: </span>
                    <Link
                      to={`/supplier/${deal.supplierId}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      {deal.supplier}
                    </Link>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Location: </span>
                    {deal.location}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button className="flex-1 flex items-center justify-between gap-3 px-5 py-3 rounded-xl
                    bg-[#DAEEFF] hover:bg-[#162B60] text-slate-700 hover:text-white
                    font-semibold text-sm transition-all duration-200 group">
                    Contact via WhatsApp
                    <span className="w-7 h-7 rounded-full bg-white/60 group-hover:bg-white/20
                      flex items-center justify-center flex-shrink-0 transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>

                  <button className="flex-1 flex items-center justify-between gap-3 px-5 py-3 rounded-xl
                    bg-[#DAEEFF] hover:bg-[#162B60] text-slate-700 hover:text-white
                    font-semibold text-sm transition-all duration-200 group">
                    Request Quote
                    <span className="w-7 h-7 rounded-full bg-white/60 group-hover:bg-white/20
                      flex items-center justify-center flex-shrink-0 transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}