import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useNavbar } from '../../context/NavbarContext'

// Assets
import pricing_illustrator from '../../assets/pricing_herosection_img.svg'
import arrow_icon from '../../assets/arrow_left_icon.svg'
// import dropdown_icon from '../../assets/dropdown_icon.png'

// ── Section 1: Hero ──────────────────────────────────────────────────────
function Section1({ onNext, isMobile }: { onNext: () => void; isMobile: boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) return
    const target = e.target as HTMLElement
    const isInteractive = target.closest('a, button, input, select, [role="button"], .no-section-click')
    if (!isInteractive) onNext()
  }

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(160deg, #FDFDFD 0%, #f5f0ff 60%, #CDE7FF 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-4 sm:px-6 md:px-10 py-12 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
            <div className="flex flex-col items-start text-center lg:text-left no-section-click">
              <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-slate-800 leading-snug mb-2 sm:mb-3">
                Unlock Full Access to <br className="hidden sm:block" /> Verified Panama Suppliers
              </h3>
              <p className="text-slate-700 text-sm sm:text-[15px] font-semibold leading-relaxed">
                Choose the plan that fits your business needs and start sourcing directly from trusted suppliers.
              </p>
              <div className="mt-4 sm:mt-8 w-full flex justify-center lg:justify-start no-section-click">
                <Link
                  to="/pricing"
                  onClick={(e) => e.stopPropagation()}
                  className="no-section-click inline-flex items-center gap-3 bg-[#162B60] hover:bg-blue-900
                    text-white font-semibold px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-[20px] text-sm sm:text-[15px]
                    transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Start a Sourcing Request
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#CFF6FF] flex items-center justify-center flex-shrink-0 no-section-click">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center no-section-click">
              <img
                src={pricing_illustrator}
                alt=""
                className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[584px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 2: Pricing Cards (first occurrence) ──────────────────────────
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

  const plans = [
    {
      name: 'Day Pass',
      tagline: 'Trial and quick exploration',
      features: [
        'Full supplier directory access',
        'Wholesale deals access',
        'Request quotes from suppliers',
        'Contact suppliers via WhatsApp'
      ],
      duration: '24 Hours Access',
      price: '$20',
      buttonText: 'Get Day Pass',
      popular: false
    },
    {
      name: 'Business Builder',
      tagline: 'Active sourcing and research',
      features: [
        'Full supplier directory access',
        'Wholesale deals access',
        'Request quotes',
        'WhatsApp supplier contact',
        'Business Idea Validation access',
        'Workshop & education access',
        'New supplier updates'
      ],
      duration: 'Per Month',
      price: '$50',
      buttonText: 'Start Monthly Plan',
      popular: false
    },
    {
      name: 'Business Pro',
      tagline: 'Serious importers and business owners',
      features: [
        'Full supplier directory access',
        'Wholesale deals access',
        'Direct supplier contact',
        'Request unlimited quotes',
        'Business Idea Validation tools',
        'Workshop & education access',
        'Priority access to new suppliers',
        'Best value pricing'
      ],
      duration: 'Per Year',
      price: '$299',
      buttonText: 'Start Yearly Plan',
      popular: true
    }
  ]

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #eef1fb 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-7xl mx-auto no-section-click">
        {/* Trust badges */}
        <div className="no-section-click">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-6 lg:px-20">
            {['Secure payments', 'Cancel anytime', 'Direct supplier access', 'No hidden fees'].map((pill) => (
              <span key={pill}
                className="text-slate-600 text-xs sm:text-sm lg:text-[16px] font-medium bg-[#FFFFFF80] py-2 px-2 rounded-full text-center">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col no-section-click`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-4">{plan.tagline}</p>

              <ul className="flex-1 mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-green-600 font-bold text-base sm:text-lg flex-shrink-0">✓</span>
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-xs sm:text-sm font-medium">{plan.duration}</span>
                <span className="text-xl sm:text-2xl font-bold text-[#162B60]">{plan.price}</span>
              </div>

              <button className="no-section-click w-full flex items-center justify-between gap-2 bg-[#E9F6FE] hover:bg-blue-900 hover:text-white text-black font-semibold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl transition-all duration-200 group text-sm sm:text-base">
                {plan.buttonText}
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white group-hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all">
                  <img src={arrow_icon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section 3: Pricing Cards (second occurrence) ─────────────────────────
function Section3({ onPrev, onNext, isMobile }: { onPrev: () => void; onNext: () => void; isMobile: boolean }) {
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

  const plans = [
    {
      name: 'Day Pass',
      tagline: 'Trial and quick exploration',
      features: [
        'Full supplier directory access',
        'Wholesale deals access',
        'Request quotes from suppliers',
        'Contact suppliers via WhatsApp'
      ],
      duration: '24 Hours Access',
      price: '$20',
      buttonText: 'Get Day Pass',
      popular: false
    },
    {
      name: 'Business Builder',
      tagline: 'Active sourcing and research',
      features: [
        'Full supplier directory access',
        'Wholesale deals access',
        'Request quotes',
        'WhatsApp supplier contact',
        'Business Idea Validation access',
        'Workshop & education access',
        'New supplier updates'
      ],
      duration: 'Per Month',
      price: '$50',
      buttonText: 'Start Monthly Plan',
      popular: false
    },
    {
      name: 'Business Pro',
      tagline: 'Serious importers and business owners',
      features: [
        'Full supplier directory access',
        'Wholesale deals access',
        'Direct supplier contact',
        'Request unlimited quotes',
        'Business Idea Validation tools',
        'Workshop & education access',
        'Priority access to new suppliers',
        'Best value pricing'
      ],
      duration: 'Per Year',
      price: '$299',
      buttonText: 'Start Yearly Plan',
      popular: true
    }
  ]

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #eef1fb 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-7xl mx-auto no-section-click pt-12 sm:pt-20">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col no-section-click`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-4">{plan.tagline}</p>

              <ul className="flex-1 mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-green-600 font-bold text-base sm:text-lg flex-shrink-0">✓</span>
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-xs sm:text-sm font-medium">{plan.duration}</span>
                <span className="text-xl sm:text-2xl font-bold text-[#162B60]">{plan.price}</span>
              </div>

              <button className="no-section-click w-full flex items-center justify-between gap-2 bg-[#E9F6FE] hover:bg-blue-900 hover:text-white text-black font-semibold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl transition-all duration-200 group text-sm sm:text-base">
                {plan.buttonText}
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white group-hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all">
                  <img src={arrow_icon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main Component with 3 sections ───────────────────────────────────────
const TOTAL_SECTIONS = 3

export default function Sourcing() {
  const { setShowNavbar2 } = useNavbar()
  const [section, setSection] = useState(0)
  const [leavingUp, setLeavingUp] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const isAnimatingRef = useRef(false)
  const sectionRef = useRef(0)

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isMobile) return
      if (e.key === 'ArrowDown') goNextRef.current()
      else if (e.key === 'ArrowUp') goPrevRef.current()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isMobile])

  // Mobile: stacked sections
  if (isMobile) {
    return (
      <div className="w-full">
        <Section1 onNext={goNext} isMobile={true} />
        <Section2 onPrev={goPrev} onNext={goNext} isMobile={true} />
        <Section3 onPrev={goPrev} onNext={goNext} isMobile={true} />
      </div>
    )
  }

  // Desktop: animated sections
  const cls = leavingUp ? 'sourcing-leave-up' : 'sourcing-enter-down'

  return (
    <>
      <style>{`
        @keyframes sourcingLeaveUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-70px); }
        }
        @keyframes sourcingEnterDown {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sourcing-leave-up {
          animation: sourcingLeaveUp 0.32s ease-in forwards;
          pointer-events: none;
        }
        .sourcing-enter-down {
          animation: sourcingEnterDown 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      <div className="w-full overflow-hidden">
        <div className={cls}>
          {section === 0 && <Section1 onNext={goNext} isMobile={false} />}
          {section === 1 && <Section2 onPrev={goPrev} onNext={goNext} isMobile={false} />}
          {section === 2 && <Section3 onPrev={goPrev} onNext={goNext} isMobile={false} />}
        </div>
      </div>
    </>
  )
}