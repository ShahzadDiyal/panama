import { useEffect, useRef, useState } from 'react'
import { useNavbar } from '../../context/NavbarContext'

// Assets
import servicing_illustrator from '../../assets/servicing_herosection_img.svg'
import illustrator from '../../assets/souring_illustrator.png'
import remote_sourcing_icon from '../../assets/remote_sourcing_icon.svg'
import business_consulting_icon from '../../assets/bus_consulting_icon.svg'
import idea_icon from '../../assets/ideas_icon1.svg'
import business_tour_icon from '../../assets/business_tour_icon.svg'

// Placeholder images for testimonials – replace with actual assets
import testimonial1 from '../../assets/testimonial1.svg'
import testimonial2 from '../../assets/testimonial2.svg'
import testimonial3 from '../../assets/testimonial3.svg'
import { Link } from 'react-router-dom'

// Section 1
function Section1({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #FDFDFD 0%, #f5f0ff 60%, #CDE7FF 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 sm:px-10 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
            <div className="flex flex-col items-start">
              <h3 className="text-xl sm:text-2xl lg:text-[40px] font-bold text-slate-800 leading-snug mb-2 sm:mb-3">
                Business Services to Help<br /> You Succeed in Panama
              </h3>
              <p className="text-slate-700 text-sm sm:text-[15px] font-semibold leading-relaxed">
                Access expert sourcing, business consulting, AI validation tools, and on-ground tours designed to help you launch and scale with confidence.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
              <img
                src={servicing_illustrator}
                alt=""
                className="w-full max-w-[340px] sm:max-w-[340px] lg:max-w-[584px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Section 2 – Core Services (4 cards, 2x2) with background "02"
function Section2({ isMobile }: { isMobile: boolean }) {
  const cards = [
    {
      title: 'Remote Sourcing',
      description: 'We find verified suppliers in Panama on your behalf and connect you directly.',
      features: ['Supplier research', 'Pricing negotiation', 'Verified introductions', 'WhatsApp communication'],
      img: remote_sourcing_icon
    },
    {
      title: 'Business Consulting with Ishmael',
      description: 'One-on-one strategic consulting to structure and grow your sourcing business.',
      features: ['Market entry strategy', 'Supplier evaluation', 'Import/export planning', 'Business growth roadmap'],
      img: business_consulting_icon
    },
    {
      title: 'AI Business Idea Validation',
      description: 'Validate your product or sourcing idea before investing capital.',
      features: ['Demand analysis', 'Competition insights', 'Profitability estimation', 'Risk overview'],
      img: idea_icon
    },
    {
      title: 'Panama Business Tours',
      description: 'Visit suppliers, free zones, and key trade hubs with guided access.',
      features: ['Supplier meetings', 'Free Zone tours', 'Networking opportunities', 'On-ground market insights'],
      img: business_tour_icon
    }
  ]

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 relative overflow-hidden ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)' }}
    >
      {/* Background number 02 */}
      <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col items-center text-[300px] font-bold text-[#162B60]/7 select-none pointer-events-none animate-pulse leading-none">
        <span>0</span>
        <span>2</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-[40px] sm:text-4xl font-bold text-[#162B60] mb-12">Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{card.title}</h3>
              <p className="text-slate-600 mb-4">{card.description}</p>
              <div className='flex justify-between items-end flex-wrap'>
                <ul className="space-y-2">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <img src={card.img} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Section 3 – Trusted by Entrepreneurs & Importers (3‑card carousel) with background "03"
function Section3({ isMobile }: { isMobile: boolean }) {
  const testimonials = [
    {
      name: 'Carlos Mendez',
      role: 'Importer, Mexico',
      text: 'Through the Panama supplier network, I connected directly with verified manufacturers and avoided costly middlemen. The sourcing process was smooth, professional, and fast',
      image: testimonial1
    },
    {
      name: 'Sofia Ramirez',
      role: 'Founder, EcoGoods',
      text: 'The Remote Sourcing service saved me a trip to Panama. Within days, I received verified supplier options and direct WhatsApp introductions. Extremely efficient.',
      image: testimonial2
    },
    {
      name: 'John Peterson',
      role: 'CEO, TradeLink',
      text: 'The Business Consulting session gave me clarity on supplier selection and pricing strategy. It helped me avoid mistakes and move forward with confidence',
      image: testimonial3
    },
    {
      name: 'Maria Gonzalez',
      role: 'Buyer, CoffeeChain',
      text: 'The Business Consulting session gave me clarity on supplier selection and pricing strategy. It helped me avoid mistakes and move forward with confidence',
      image: testimonial1
    },
    {
      name: 'David Chen',
      role: 'Founder, TechImport',
      text: 'The Remote Sourcing service saved me a trip to Panama. Within days, I received verified supplier options and direct WhatsApp introductions. Extremely efficient.',
      image: testimonial2
    },
    {
      name: 'Lisa Kumar',
      role: 'CEO, Global Goods',
      text: 'Through the Panama supplier network, I connected directly with verified manufacturers and avoided costly middlemen. The sourcing process was smooth, professional, and fast',
      image: testimonial3
    }
  ]

  const [slideIndex, setSlideIndex] = useState(0)
  const cardsPerSlide = 3
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide)

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % totalSlides)
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides)

  const startIdx = slideIndex * cardsPerSlide
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + cardsPerSlide)

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 relative overflow-hidden ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #eef1fb 100%)' }}
    >
      {/* Background number 03 */}
      <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col items-center text-[300px] font-bold text-[#162B60]/7 select-none pointer-events-none animate-pulse leading-none">
        <span>0</span>
        <span>3</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Row 1: Why Work With Us? */}
        <div>
          <h2 className="text-[24px] font-bold text-[#162B60] mb-6">Why Work With Us?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10 ">
            {['✓  Save travel costs', '✓ Avoid fake suppliers', '✓ Local negotiation advantage', '✓ Faster supplier access'].map((pill) => (
              <span key={pill}
                className="text-slate-600 text-[12px] sm:text-[16px] font-medium bg-white
                 py-2 sm:py-2.5 rounded-full text-center ">
                {pill}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-[24px] font-bold text-[#162B60] mb-12 text-start">
          Trusted by Entrepreneurs & Importers
        </h2>

        {/* Carousel container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-40">
            {visibleTestimonials.map((t, idx) => (
              <div key={startIdx + idx} className="bg-white shadow-lg p-6 flex flex-col items-center text-center">
                <div className="w-30 h-30 rounded-full overflow-hidden mb-4">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-800">{t.name}</h4>
                <p className="text-slate-500 text-sm">{t.role}</p>
                <p className="text-slate-700 mb-4">{t.text}</p>
              </div>
            ))}
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setSlideIndex(idx); }}
                className={`h-1 rounded-full transition-all duration-300 ${idx === slideIndex ? 'w-20 bg-[#162B60]' : 'w-8 bg-gray-300'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Section 4 – Left‑Right with floating number "04"
function Section4({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-20 pt-40 sm:pt-28 relative overflow-hidden ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #eef1fb 0%, #f5f0ff 100%)' }}
    >
      <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col items-center text-[300px] font-bold text-[#162B60]/7 select-none pointer-events-none animate-pulse leading-none">
        <span>0</span>
        <span>4</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-20" >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-[24px] font-bold text-[#162B60] leading-tight">
              Ready to Build Your Panama Business?
            </h2>
            <p className="text-[20px] text-slate-700">
              Gain direct access to verified suppliers, expert guidance, and sourcing support — everything you need to confidently launch and grow your business in Panama.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={illustrator}
              alt="Sourcing illustration"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to='/pricing' className="group flex items-center justify-center gap-2 w-full lg:px-24  
            py-4 sm:py-3 rounded-xl text-[16px] font-semibold transition-all duration-200
            bg-[#4042E1] text-white hover:bg-[#162B60]">
            View Pricing Plans
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
              transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          <button className="group flex items-center justify-center gap-2 w-full lg:px-24  
            py-4 sm:py-4 rounded-xl text-[16px] font-semibold transition-all duration-200
            bg-[#4042E1] text-white hover:bg-[#162B60] cursor-pointer">
            Book a Consultation
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
              transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Main component with section navigation
const TOTAL_SECTIONS = 4

export default function Servicing() {
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

  // Arrow keys – desktop only
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

  // Mobile: render all sections stacked, normal scroll
  if (isMobile) {
    return (
      <div className="w-full">
        <Section1 isMobile={true} />
        <Section2 isMobile={true} />
        <Section3 isMobile={true} />
        <Section4 isMobile={true} />
      </div>
    )
  }

  // Desktop: section‑by‑section animation
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
              <Section1 isMobile={false} />
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
              <Section2 isMobile={false} />
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
              <Section3 isMobile={false} />
            </div>
          )}

          {/* Section 3 */}
          {currentSection === 3 && (
            <div
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[3] = el;
              }}
              className="h-screen overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <Section4 isMobile={false} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}