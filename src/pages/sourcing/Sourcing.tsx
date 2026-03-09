import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useNavbar } from '../../context/NavbarContext'

// Assets
import sourcing_illustrator from '../../assets/sourcing_herosection_img.png'
import agriculture_icon from '../../assets/agriculture_icon.svg'
import electronics_icon from '../../assets/electronic_icon.svg'
import textile_icon from '../../assets/textile_icon.svg'
import packaging_icon from '../../assets/packaging_icon.svg'
import food_icon from '../../assets/food_icon.svg'
import industrial_icon from '../../assets/industrial_icon.svg'
import arrow_icon from '../../assets/arrow_left_icon.svg'
import dropdown_icon from '../../assets/dropdown_icon.png'
import type { Category } from '../../types'
import { publicService } from '../../services/publicService'

// ── Section 1: Upsell Section ────────────────────────────────────────────
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
          {/* Text + Image row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
            <div className="flex flex-col items-start no-section-click">
              <h3 className="text-xl sm:text-2xl lg:text-[40px] font-bold text-slate-800 leading-snug mb-2 sm:mb-3">
                Remote Sourcing in Panama <br />— We Source For You
              </h3>
              <p className="text-slate-700 text-sm sm:text-[15px] font-semibold leading-relaxed">
                Can’t travel to Panama? Our team will find verified suppliers, negotiate pricing, and connect you directly.
              </p>
              {/* Button */}
              <div className="mt-2 sm:mt-8 flex justify-center no-section-click">
                <Link
                  to="/pricing"
                  onClick={(e) => e.stopPropagation()}
                  className="no-section-click inline-flex items-center gap-3 bg-[#162B60] hover:bg-blue-900
                    text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-[20px] text-sm sm:text-[15px]
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
                src={sourcing_illustrator}
                alt=""
                className="w-full max-w-[340px] sm:max-w-[340px] lg:max-w-[584px] object-contain"
              />
            </div>
          </div>
        </div>
        {/* Trust pills */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10 no-section-click">
          {['✓ Verified suppliers', '✓ On-ground sourcing team', '✓ Transparent communication'].map((pill) => (
            <span
              key={pill}
              className="text-slate-600 text-[12px] sm:text-[14px] font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-center"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section 2: How It Works & What We Source ─────────────────────────────
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

  const steps = [
    { number: 1, title: 'Submit Your Product Request', description: 'Tell us what product you’re looking for, quantity, and budget.' },
    { number: 2, title: 'We Source & Verify', description: 'Our local team contacts suppliers, checks pricing, and verifies legitimacy.' },
    { number: 3, title: 'Receive Supplier Contacts', description: 'We send you verified supplier options and help you connect directly.' }
  ]

  const categories = [
    { name: 'Agriculture & Produce', icon: agriculture_icon },
    { name: 'Electronics', icon: electronics_icon },
    { name: 'Apparel & Textiles', icon: textile_icon },
    { name: 'Packaging', icon: packaging_icon },
    { name: 'Food & Beverage', icon: food_icon },
    { name: 'Industrial Supplies', icon: industrial_icon }
  ]

  const checklist = [
    'Supplier research',
    'Price negotiation',
    'Direct supplier contact',
    'WhatsApp introduction',
    'Summary report'
  ]

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-7xl mx-auto space-y-16 no-section-click">
        {/* Row 1 - HOW IT WORKS */}
        <div className="no-section-click">
          <h2 className="text-[40px] sm:text-4xl font-bold text-[#162B60] mb-4">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-40">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl pt-6 transition-all duration-300 no-section-click">

                <h3 className="text-[18px] font-bold text-slate-800 mb-2 no-section-click">{step.title}</h3>
                <p className="text-slate-600 text-[16px] font-medium leading-relaxed no-section-click">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - WHAT WE SOURCE */}
        <div className="no-section-click">
          <h2 className="text-[24px] font-bold text-[#162B60] mb-4">WHAT WE SOURCE</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 no-section-click">
                <img src={cat.icon} alt="" className="mb-2" />
                <span className="text-slate-700 text-sm font-medium no-section-click">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - One-Time Sourcing Fee */}
        <div className="no-section-click">
          <h2 className="text-[24px] font-bold text-[#162B60] mb-8 uppercase">One-Time Sourcing Fee</h2>
          <div className="bg-white shadow-xl p-4 no-section-click">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 no-section-click">
              {/* Left side - Checklist */}
              <div className="space-y-3 flex-1 no-section-click">
                {checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 no-section-click">
                    ✓
                    <span className="text-slate-700 no-section-click">{item}</span>
                  </div>
                ))}
              </div>

              {/* Right side - Price & Button */}
              <div className="flex flex-col items-start lg:items-end gap-4 flex-1 no-section-click">
                <div className="no-section-click">
                  <p className="text-4xl font-bold text-[#162B60]">$XXX</p>
                  <p className="text-slate-500">Per Product Request</p>
                </div>
                <button
                  className="flex items-center justify-between gap-3 px-20 py-3 rounded-[10px]
                        bg-black hover:bg-[#162B60] text-white hover:text-white
                        font-semibold text-[16px] transition-all duration-200 group"
                >
                  Proceed to Checkout
                  <span className="w-7 h-7 rounded-full bg-[#CFF6FF] group-hover:bg-white/20
                        flex items-center justify-center flex-shrink-0 transition-all">
                    <img src={arrow_icon} alt="" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 3: Pricing & Form ────────────────────────────────────────────
function Section3({ onPrev, onNext, isMobile }: { onPrev: () => void; onNext: () => void; isMobile: boolean }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loadingCategories, setLoadingCategories] = useState(true);


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
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #eef1fb 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-7xl mx-auto">
        {/* Back icon - row 1 */}
        <div className="mb-12 no-section-click">
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="no-section-click inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md text-slate-600 hover:text-slate-900 transition-all duration-200"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div>
          {/* Right Column - Request Form */}
          <div className="space-y-6 no-section-click">
            <div className="no-section-click">
              {/* Form fields grid */}
              <div className="space-y-16 no-section-click">
                {/* Row 1 - Three fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 no-section-click">
                  <input type="text" placeholder="Full Name" className="no-section-click bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                  <input type="email" placeholder="Email" className="no-section-click p-3 bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                  <input type="tel" placeholder="WhatsApp Number" className="no-section-click p-3 bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                </div>

                {/* Row 2 - Three fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 no-section-click">
                  <div className="relative w-full">
                    <select
                      className="no-section-click appearance-none p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full bg-white pr-10"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      <option>Country</option>
                      <option>Panama</option>
                      <option>USA</option>
                      <option>Canada</option>
                    </select>
                    <img
                      src={dropdown_icon}
                      alt=""
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none no-section-click"
                    />
                  </div>
                  <input type="text" placeholder="Product Name" className="no-section-click p-3 bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                  <div className="relative w-full">
                    <select
                      value={selectedCategory} // This expects a string, not Category[]
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="no-section-click appearance-none p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full bg-white pr-10"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
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



                    <img
                      src={dropdown_icon}
                      alt=""
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none no-section-click"
                    />
                  </div>
                </div>

                {/* Row 3 - Estimated Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 no-section-click">
                  <input type="text" placeholder="Full Name" className="no-section-click p-3 bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                  <input type="file" placeholder="Email" className="no-section-click p-3 bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                </div>



              </div>

              {/* Row 5 - Button centered */}
              <div className="mt-12 flex justify-center no-section-click">
                <button

                  onClick={(e) => e.stopPropagation()}
                  className="no-section-click inline-flex items-center gap-3 bg-black hover:bg-blue-900
                    text-white font-semibold px-16 py-3 sm:py-3.5 rounded-[10px] text-sm sm:text-[15px]
                    transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Submit & Proceed to Payment
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#CFF6FF] flex items-center justify-center flex-shrink-0 no-section-click">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 4: Why Use Remote Sourcing & FAQ ─────────────────────────────
function Section4({ onPrev, onNext, isMobile }: { onPrev: () => void; onNext: () => void; isMobile: boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) return
    const target = e.target as HTMLElement
    const isInteractive = target.closest('a, button, input, select, [role="button"], .no-section-click')
    if (!isInteractive) onPrev()
  }

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    { q: 'How long does sourcing take?', a: 'Typically 2-5 business days depending on product complexity and supplier availability.' },
    { q: 'Do you guarantee pricing?', a: 'We negotiate the best possible prices, but final pricing is confirmed directly with suppliers.' },
    { q: 'Do you handle shipping?', a: 'We can connect you with logistics partners, but shipping arrangements are handled separately.' },
  ]

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #eef1fb 0%, #f5f0ff 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-5xl mx-auto space-y-8 no-section-click">
        {/* Row 1: Why Use Remote Sourcing? */}
        <div className="no-section-click">
          <h2 className="text-[24px] font-bold text-[#162B60] mb-6">Why Use Remote Sourcing?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
            {['✓  Save travel costs', '✓ Avoid fake suppliers', '✓ Local negotiation advantage', '✓ Faster supplier access'].map((pill) => (
              <span key={pill}
                className="text-slate-600 text-[12px] sm:text-[16px] font-medium
                 py-2 sm:py-2.5 rounded-full text-center ">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: FAQ Box */}
        <div className="bg-[#FFFFFF4D] rounded-2xl shadow-xl p-6 sm:p-8 no-section-click">
          <h3 className="text-2xl font-bold text-[#162B60] mb-6">FAQs</h3>
          <div className="space-y-3 px-14">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden no-section-click">
                <button
                  className="no-section-click w-full flex justify-between items-center p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-slate-800 no-section-click">{faq.q}</span>
                  <img src={dropdown_icon} alt="" />
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-4 text-slate-600 text-sm border-t border-slate-200 no-section-click">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: CTA Box */}
        <div className="bg-gradient-to-r from-[#b8b6b6] to-[#c7b6b6] backdrop-blur-[24.2px] rounded-2xl shadow-xl p-4 flex flex-col items-center no-section-click">
          <h3 className="text-2xl font-bold text-white text-center sm:text-left w-full mb-6 no-section-click">
            Ready to Source From Panama Remotely?
          </h3>
          <div className="mt-2 flex justify-center no-section-click">
            <button
              onClick={(e) => e.stopPropagation()}
              className="no-section-click inline-flex items-center gap-3 bg-[#162B60] hover:bg-blue-900
                    text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-[20px] text-sm sm:text-[15px]
                    transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Submit Your Request Now
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#CFF6FF] flex items-center justify-center flex-shrink-0 no-section-click">
                <img src={arrow_icon} alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 5: Duplicate of FAQ & CTA (for layout purposes) ──────────────
function Section5({ onPrev, isMobile }: { onPrev: () => void; isMobile: boolean }) {
  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) return
    const target = e.target as HTMLElement
    const isInteractive = target.closest('a, button, input, select, [role="button"], .no-section-click')
    if (!isInteractive) onPrev()
  }

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    { q: 'How long does sourcing take?', a: 'Typically 2-5 business days depending on product complexity and supplier availability.' },
    { q: 'Do you guarantee pricing?', a: 'We negotiate the best possible prices, but final pricing is confirmed directly with suppliers.' },
    { q: 'Do you handle shipping?', a: 'We can connect you with logistics partners, but shipping arrangements are handled separately.' },
  ]

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-10 pt-40  ${!isMobile ? 'cursor-pointer' : ''}`}
      style={{ background: 'linear-gradient(135deg, #eef1fb 0%, #f5f0ff 100%)' }}
      onClick={handleClick}
    >
      <div className="max-w-5xl mx-auto space-y-8 no-section-click">

        {/* Row 2: FAQ Box */}
        <div className="bg-[#FFFFFF4D] rounded-2xl shadow-xl p-6 sm:p-8 no-section-click">
          <h3 className="text-2xl font-bold text-[#162B60] mb-6">FAQs</h3>
          <div className="space-y-3 px-14">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden no-section-click">
                <button
                  className="no-section-click w-full flex justify-between items-center p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-slate-800 no-section-click">{faq.q}</span>
                  <img src={dropdown_icon} alt="" />
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-4 text-slate-600 text-sm border-t border-slate-200 no-section-click">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: CTA Box */}
        <div className="bg-gradient-to-r from-[#b8b6b6] to-[#c7b6b6] backdrop-blur-[24.2px] rounded-2xl shadow-xl p-4 flex flex-col items-center no-section-click">
          <h3 className="text-2xl font-bold text-white text-center sm:text-left w-full mb-6 no-section-click">
            Ready to Source From Panama Remotely?
          </h3>
          <div className="mt-2 flex justify-center no-section-click">
            <button
              onClick={(e) => e.stopPropagation()}
              className="no-section-click inline-flex items-center gap-3 bg-[#162B60] hover:bg-blue-900
                    text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-[20px] text-sm sm:text-[15px]
                    transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Submit Your Request Now
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#CFF6FF] flex items-center justify-center flex-shrink-0 no-section-click">
                <img src={arrow_icon} alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Sourcing Component ───────────────────────────────────────────────
const TOTAL_SECTIONS = 5

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

  // On mobile: render all sections stacked, normal scroll
  if (isMobile) {
    return (
      <div className="w-full">
        <Section1 onNext={goNext} isMobile={true} />
        <Section2 onPrev={goPrev} onNext={goNext} isMobile={true} />
        <Section3 onPrev={goPrev} onNext={goNext} isMobile={true} />
        <Section4 onPrev={goPrev} onNext={goNext} isMobile={true} />
        <Section5 onPrev={goPrev} isMobile={true} />
      </div>
    )
  }

  // Desktop: section-by-section with animation
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
          {section === 4 && <Section5 onPrev={goPrev} isMobile={false} />}
        </div>
      </div>
    </>
  )
}