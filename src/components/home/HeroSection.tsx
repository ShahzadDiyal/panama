import { useState } from 'react'
import { Link } from 'react-router-dom'
import herobg from '../../assets/heroImg.png'
// import arrow1 from '../../assets/arrow-1.png'
import users from '../../assets/users_icon.png'
import chat from '../../assets/telegram_icon.png'
import verifiedbadge from '../../assets/verified_tick.png'
import productImg from '../../assets/product_img.png'
import herobgSmall from '../../assets/herobgimg.png'

const badges = [
  {
    icon: (
      <img src={verifiedbadge} alt="" />
    ),
    label: 'Verified Suppliers',
  },
  {
    icon: (
      <img src={chat} alt="" />
    ),
    label: 'Direct WhatsApp',
  },
  {
    icon: (
      <img src={users} alt="" />
    ),
    label: 'No Middlemen',
  },
]

export default function HeroSection() {
  const [query, setQuery] = useState('')

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-10 bg-white">

      {/*
        THE FIX:
        Instead of min-h-screen (which stretches beyond image height on large screens),
        we use a real <img> tag as an invisible height anchor.
        The img renders at its natural aspect ratio, making the container
        exactly as tall as the image on every screen size.
        All content sits absolutely on top.
      */}
      <div className="relative w-full">

        {/* Invisible img — ONLY purpose is to give the div its natural aspect-ratio height */}
        <img
          src={herobg}
          alt=""
          aria-hidden="true"
          className="w-full hidden min-[1124px]:block opacity-0 pointer-events-none select-none "
        />
        <div
          className="block min-[1300px]:hidden"
          style={{ minHeight: '1000px' }}
        />

        {/* Background: herobgSmall below 1124px, herobg above */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat min-[1300px]:hidden"
          style={{ backgroundImage: `url(${herobgSmall})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden min-[1300px]:block"
          style={{ backgroundImage: `url(${herobg})` }}
        />

        {/* Content layer */}
        <div className="absolute inset-0 z-10 flex flex-col">


          {/* Search bar — positioned at ~8% from top */}
          <div className="flex justify-center mt-[80px] md:mt-[8%] px-4 mb-4 ">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search suppliers, products, or categories"
                className="w-full pl-5 pr-12 py-3 rounded-full border border-white/60
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

          {/* Headline — positioned at ~15% from top */}
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

          {/* Flex-1 pushes bottom row to the bottom */}
          <div className="xl:flex-1" />

          {/* content -- 2 */}
          {/* Bottom row — badges | explore | card */}
          <div className="w-full flex flex-col xl:flex-row xl:items-center xl:items-end justify-between gap-6 xl:gap-0 xl:mt-0 mt-6">
            {/* ^^^ CHANGED: flex-col on small screens, flex-row on xl (1200px+) */}

            {/* Left: Badges */}
            <div className="flex flex-row  xl:px-0 px-6 xl:flex-col flex-wrap gap-3 xl:justify-center lg:justify-center md:justify-start justify-center">
              {/* ^^^ CHANGED: flex-row on small screens, flex-col on xl */}
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="inline-flex w-full md:w-[250px] xl:w-[230px] items-center gap-3 px-8 py-3 rounded-full
                    lg:bg-[#6D9098] border border-white/20 text-white text-[16px] font-medium
                    hover:bg-white/20 transition-colors duration-200 cursor-default"
                >
                  <span className="text-amber-400 flex-shrink-0">{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            {/* Center: Explore button */}
            <div className="flex justify-center items-end pb-1 px-6">

              <Link
                to="/supplier"
                className={`group mt-auto flex items-center justify-center gap-2 w-full lg:px-24  
            py-4 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200
            bg-[#162B60] text-white hover:bg-[#162B60] hover:text-white
             `}
              >
                Explore Suppliers

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

            {/* Right: Supplier card */}
            <div className="flex items-end justify-center xl:px-0 px-6">
              <div className="bg-[#6D9098] rounded-2xl shadow-2xl p-4 w-full xl:w-60 md:w-[900px]">
                <div className="flex items-center justify-center gap-1.5 text-[#A0FE89] text-[18px] py-2 font-semibold mb-3 text-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Verified Supplier
                </div>

                <div className="flex justify-center mb-3">
                  <div className="w-24 h-24 rounded-full bg-emerald-50 border-2 border-emerald-100 shadow flex items-center justify-center">
                    <img src={productImg} alt="" className='rounded-full' />
                  </div>
                </div>

                <div className="text-start mb-4">
                  <h3 className="font-semibold text-white text-[18px]">Tropic Beauty Exports</h3>
                  <p className="text-white/50 text-[16px] mt-0.5">Beauty &amp; Personal Care</p>
                  <div className="flex items-center justify-start gap-1 mt-1 text-white text-xs">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Chiriqui
                  </div>
                </div>

                {/* <Link
                to="/supplier"
                className={`group mt-auto flex items-center justify-center gap-2 w-full lg:px-24  
            py-4 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200
            bg-[#162B60] text-white hover:bg-[#162B60] hover:text-white
             `}
              >
                Explore Suppliers

                <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
            transition-all duration-300 group-hover:rotate-[-45deg]
              bg-[#B8E4FF]` }>
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
              </Link> */}


                <Link
                  to="/supplier"
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

          </div>
        </div>
      </div>
    </div>
  )
}