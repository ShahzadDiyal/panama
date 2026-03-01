import { useState } from 'react'
import { Link } from 'react-router-dom'
import herobg from '../../assets/heroImg.png'
import arrow1 from '../../assets/arrow-1.png'
import users from '../../assets/users_icon.png'
import chat from '../../assets/telegram_icon.png'
import verifiedbadge from '../../assets/verified_tick.png'
import productImg from '../../assets/product_img.png'
import herobgSmall from '../../assets/herobgimg.png'

const badges = [
  {
    icon: <img src={verifiedbadge} alt="" />,
    label: 'Verified Suppliers',
  },
  {
    icon: <img src={chat} alt="" />,
    label: 'Direct WhatsApp',
  },
  {
    icon: <img src={users} alt="" />,
    label: 'No Middlemen',
  },
]

export default function HeroSection() {
  const [query, setQuery] = useState('')

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-10 bg-white">
      <div className="relative w-full">

        {/*
          Below 1124px  → herobgSmall + fixed tall height (content stacks)
          Above 1124px  → herobg    + invisible img aspect-ratio anchor
          1124px ≈ Tailwind's "lg" (1024) < x < "xl" (1280).
          We use a custom inline breakpoint via a wrapping approach:
          We'll treat "xl" (1280px) as our cut-off since Tailwind has no 1124px preset.
          To hit exactly 1124px, add `screens: { 'custom': '1124px' }` to tailwind.config.
          Here we use xl (1280px) as the nearest standard breakpoint.
        */}

        {/* ── Height anchor: invisible img shown only on xl+ ── */}
        <img
          src={herobg}
          alt=""
          aria-hidden="true"
          className="w-full hidden xl:block opacity-0 pointer-events-none select-none"
        />

        {/* ── Height spacer for below xl — tall enough for stacked content ── */}
        <div className="block xl:hidden" style={{ minHeight: '920px' }} />

        {/* ── Background images ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat xl:hidden"
          style={{ backgroundImage: `url(${herobgSmall})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden xl:block"
          style={{ backgroundImage: `url(${herobg})` }}
        />

        {/* ── Content layer ── */}
        <div className="absolute inset-0 z-10 flex flex-col">

          {/* Search bar */}
          <div className="flex justify-center mt-20 xl:mt-[8%] px-4">
            <div className="relative w-full xl:max-w-xl">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search suppliers, products, or categories"
                className="w-full pl-5 pr-12 py-2 lg:py-3 rounded-full border border-white/60
                  text-white placeholder-white/70 text-sm shadow-lg focus:outline-none
                  bg-white/10 backdrop-blur-sm"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7
                flex items-center justify-center rounded-full bg-gray-400/80 transition-colors duration-200">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Headline */}
          <div className="px-6 sm:px-10 mt-[4%]">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight mb-3">
              Source Directly from Verified <br />
              Panama Suppliers
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-sm">
              Wholesale deals, trusted suppliers, and remote sourcing — built for buyers who want
              direct access without middlemen.
            </p>
          </div>

          {/* Spacer — only active on xl+ to push bottom row down */}
          <div className="hidden xl:block xl:flex-1" />

          {/* ═══════════════════════════════════════════════════════════════
              MOBILE / TABLET layout — below xl (< ~1280px)
              - badges in flex-row, no bg color
              - explore button below badges
              - card full width, centered content, below explore button
          ════════════════════════════════════════════════════════════════ */}
          <div className="flex xl:hidden flex-col gap-5 px-4 pb-6 mt-20">

            {/* Badges row — no bg, transparent */}
            <div className="flex flex-row flex-wrap gap-2">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-2 px-4 py-2
                    rounded-full border border-white/40
                    text-white text-sm font-medium cursor-default"
                >
                  <span className="flex-shrink-0">{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            {/* Explore button — below badges */}
            <div className=''>
              <Link
                to="/supplier"
                className="inline-flex items-center gap-2.5 px-10 py-3.5 rounded-xl
                  bg-[#162B60] text-white font-semibold text-sm
                  border border-white/10 transition-all duration-200
                  shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
              >
                Explore Suppliers
                <span className="w-6 h-6 rounded-full bg-[#CFF6FF] flex items-center justify-center flex-shrink-0">
                  <img src={arrow1} alt="" className="w-3 h-3" />
                </span>
              </Link>
            </div>

            {/* Supplier card — full width, all content centered */}
            <div className="w-full">
              <div className="bg-[#6D9098] rounded-2xl shadow-2xl p-6 w-full">

                {/* Verified badge */}
                <div className="flex items-center justify-center gap-2 text-[#A0FE89] text-base font-semibold mb-4 text-center">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Verified Supplier
                </div>

                {/* Product image — centered */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 shadow overflow-hidden">
                    <img src={productImg} alt="" className="rounded-full w-full h-full object-cover" />
                  </div>
                </div>

                {/* Info — centered */}
                <div className="text-center mb-5">
                  <h3 className="font-semibold text-white text-lg">Tropic Beauty Exports</h3>
                  <p className="text-white/50 text-sm mt-1">Beauty &amp; Personal Care</p>
                  <div className="flex items-center justify-center gap-1 mt-1.5 text-white text-xs">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Chiriqui
                  </div>
                </div>

                {/* View Profile button */}
                <Link
                  to="/supplier"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                    bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors duration-200"
                >
                  View Profile
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════
              DESKTOP layout — xl+ (≥ ~1280px)
              Original horizontal 3-col, gradually scales on 2xl+
          ════════════════════════════════════════════════════════════════ */}
          <div className="hidden xl:flex w-full flex-row items-end justify-between">

            {/* Left: Badges */}
            <div className="flex flex-col gap-2 xl:gap-2 2xl:gap-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-2 xl:gap-3
                    px-5 xl:px-6 2xl:px-8
                    py-2 xl:py-2.5 2xl:py-3
                    w-[170px] xl:w-[200px] 2xl:w-[230px]
                    rounded-full bg-[#6D9098] border border-white/20
                    text-white text-[13px] xl:text-[14px] 2xl:text-[16px] font-medium
                    hover:bg-white/20 transition-colors duration-200 cursor-default"
                >
                  <span className="text-amber-400 flex-shrink-0">{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            {/* Center: Explore button */}
            <div className="flex justify-center items-end pb-1">
              <Link
                to="/supplier"
                className="flex items-center gap-2 xl:gap-2.5
                  px-10 xl:px-14 2xl:px-20
                  py-2.5 xl:py-3 2xl:py-3.5
                  rounded-xl bg-[#162B60] text-white font-semibold
                  text-xs xl:text-sm
                  backdrop-blur-sm border border-white/10 transition-all duration-200
                  shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
              >
                Explore Suppliers
                <span className="w-5 h-5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6
                  rounded-full bg-[#CFF6FF] flex items-center justify-center flex-shrink-0">
                  <img src={arrow1} alt="" className="w-2.5 h-2.5 xl:w-3 xl:h-3 2xl:w-3.5 2xl:h-3.5" />
                </span>
              </Link>
            </div>

            {/* Right: Supplier card */}
            <div className="flex items-end">
              <div className="bg-[#6D9098] rounded-xl sm:rounded-2xl shadow-2xl
                p-3 xl:p-3.5 2xl:p-4
                w-44 xl:w-52 2xl:w-60">

                <div className="flex items-center justify-center gap-1.5
                  text-[#A0FE89] text-[13px] xl:text-[15px] 2xl:text-[18px]
                  py-1.5 xl:py-2 font-semibold mb-2 xl:mb-3 text-center">
                  <svg className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Verified Supplier
                </div>

                <div className="flex justify-center mb-2 xl:mb-3">
                  <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24
                    rounded-full bg-emerald-50 border-2 border-emerald-100 shadow overflow-hidden">
                    <img src={productImg} alt="" className="rounded-full w-full h-full object-cover" />
                  </div>
                </div>

                <div className="text-start mb-2 xl:mb-3 2xl:mb-4">
                  <h3 className="font-semibold text-white text-[13px] xl:text-[15px] 2xl:text-[18px]">
                    Tropic Beauty Exports
                  </h3>
                  <p className="text-white/50 text-[11px] xl:text-[13px] 2xl:text-[16px] mt-0.5">
                    Beauty &amp; Personal Care
                  </p>
                  <div className="flex items-center justify-start gap-1 mt-0.5 xl:mt-1 text-white text-[10px] xl:text-xs">
                    <svg className="w-2.5 h-2.5 xl:w-3 xl:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Chiriqui
                  </div>
                </div>

                <Link
                  to="/supplier"
                  className="flex items-center justify-center gap-1.5 xl:gap-2 w-full
                    py-2.5 xl:py-3 2xl:py-4 rounded-xl
                    bg-slate-800 hover:bg-slate-700 text-white
                    text-[11px] xl:text-[13px] 2xl:text-[16px] font-semibold transition-colors duration-200"
                >
                  View Profile
                  <svg className="w-3 h-3 xl:w-3.5 xl:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}