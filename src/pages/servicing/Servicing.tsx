import { useEffect, useRef, useState } from 'react'
import { useNavbar } from '../../context/NavbarContext'

// Assets
import servicing_illustrator from '../../assets/servicing_herosection_img.svg'
import illustrator from '../../assets/souring_illustrator.png'
import arrow_icon from '../../assets/arrow_left_icon.svg'
import remote_sourcing_icon from '../../assets/remote_sourcing_icon.svg'
import business_consulting_icon from '../../assets/bus_consulting_icon.svg'
import idea_icon from '../../assets/ideas_icon1.svg'
import business_tour_icon from '../../assets/business_tour_icon.svg'

// Placeholder images for testimonials – replace with actual assets
import testimonial1 from '../../assets/testimonial1.svg'
import testimonial2 from '../../assets/testimonial2.svg'
import testimonial3 from '../../assets/testimonial3.svg'

// Section 1 – unchanged
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
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 sm:px-10 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
            <div className="flex flex-col items-start no-section-click">
              <h3 className="text-xl sm:text-2xl lg:text-[40px] font-bold text-slate-800 leading-snug mb-2 sm:mb-3">
                Business Services to Help<br /> You Succeed in Panama
              </h3>
              <p className="text-slate-700 text-sm sm:text-[15px] font-semibold leading-relaxed">
                Access expert sourcing, business consulting, AI validation tools, and on-ground tours designed to help you launch and scale with confidence.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center no-section-click">
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
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 relative overflow-hidden ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)' }}
      onClick={handleClick}
    >
      {/* Background number 02 */}
      <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col items-center text-[300px] font-bold text-[#162B60]/7 select-none pointer-events-none animate-pulse leading-none">
        <span>0</span>
        <span>2</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 no-section-click">
        <h2 className="text-[40px] sm:text-4xl font-bold text-[#162B60] mb-12">Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 no-section-click"
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

  // Expanded testimonials (6 items) for multi‑card carousel
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
      image: testimonial1 // using same image for demo
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

  // Get current set of testimonials
  const startIdx = slideIndex * cardsPerSlide
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + cardsPerSlide)

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 relative overflow-hidden ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #eef1fb 100%)' }}
      onClick={handleClick}
    >
      {/* Background number 03 */}
     <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col items-center text-[300px] font-bold text-[#162B60]/7 select-none pointer-events-none animate-pulse leading-none">
        <span>0</span>
        <span>3</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 no-section-click">
        {/* Row 1: Why Work With Us? */}
        <div className="no-section-click">
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
          {/* Cards grid – 3 columns on large screens, 1 on mobile */}
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

          {/* Navigation arrows – only show if more than one slide */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="no-section-click absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="no-section-click absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Indicator lines – one per slide */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setSlideIndex(idx); }}
                className={`no-section-click h-1 rounded-full transition-all duration-300 ${idx === slideIndex ? 'w-20 bg-[#162B60]' : 'w-8 bg-gray-300'
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
function Section4({ onPrev, onNext, isMobile }: { onPrev: () => void; onNext: () => void; isMobile: boolean }) {
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

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-20 pt-40 sm:pt-28 relative overflow-hidden ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #eef1fb 0%, #f5f0ff 100%)' }}
      onClick={handleClick}
    >
     <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col items-center text-[300px] font-bold text-[#162B60]/7 select-none pointer-events-none animate-pulse leading-none">
        <span>0</span>
        <span>4</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 no-section-click pt-20" >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side: heading and text */}
          <div className="space-y-6">
            <h2 className="text-[24px] font-bold text-[#162B60] leading-tight">
              Ready to Build Your Panama Business?
            </h2>
            <p className="text-[20px] text-slate-700">
              Gain direct access to verified suppliers, expert guidance, and sourcing support — everything you need to confidently launch and grow your business in Panama.
            </p>
            
          </div>

          {/* Right side: image */}
          <div className="flex justify-center">
            <img
              src={illustrator}
              alt="Sourcing illustration"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="no-section-click flex-1 py-4 px-6 bg-[#4042E1] hover:bg-blue-900 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
               View Pricing Plans
              <span className='bg-[#CFF6FF] rounded-full p-1'>
 <img src={arrow_icon} alt="" className="w-6 h-6" />
                </span>
              </button>
              <button className="no-section-click flex-1 py-4 px-6 bg-[#4042E1] border-[#162B60] text-white hover:bg-[#162B60] hover:text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                Book a Consultation
                <span className='bg-[#CFF6FF] rounded-full p-1'>
 <img src={arrow_icon} alt="" className="w-6 h-6" />
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

  // Mobile: render all sections stacked
  if (isMobile) {
    return (
      <div className="w-full">
        <Section1 onNext={goNext} isMobile={true} />
        <Section2 onPrev={goPrev} onNext={goNext} isMobile={true} />
        <Section3 onPrev={goPrev} onNext={goNext} isMobile={true} />
        <Section4 onPrev={goPrev} onNext={goNext} isMobile={true} />
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
          {section === 0 && <Section1 onNext={goNext} isMobile={false} />}
          {section === 1 && <Section2 onPrev={goPrev} onNext={goNext} isMobile={false} />}
          {section === 2 && <Section3 onPrev={goPrev} onNext={goNext} isMobile={false} />}
          {section === 3 && <Section4 onPrev={goPrev} onNext={goNext} isMobile={false} />}
        </div>
      </div>
    </>
  )
}