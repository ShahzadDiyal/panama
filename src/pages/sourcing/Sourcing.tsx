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
import dropdown_icon from '../../assets/dropdown_icon.png'
import type { Category } from '../../types'
import { publicService } from '../../services/publicService'

// ── Section 1: Upsell Section ────────────────────────────────────────────
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
                Remote Sourcing in Panama <br />— We Source For You
              </h3>
              <p className="text-slate-700 text-sm sm:text-[15px] font-semibold leading-relaxed">
                Can’t travel to Panama? Our team will find verified suppliers, negotiate pricing, and connect you directly.
              </p>

              <div className="mt-2 sm:mt-8 flex justify-center">
                <Link
                  to="/pricing"
                  className="group flex items-center justify-center gap-2 w-full lg:px-24 py-4 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200 bg-[#162B60] text-white hover:bg-[#162B60]"
                >
                  Start a Sourcing Request
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
              <img
                src={sourcing_illustrator}
                alt=""
                className="w-full max-w-[340px] sm:max-w-[340px] lg:max-w-[584px] object-contain"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10">
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
function Section2({ isMobile }: { isMobile: boolean }) {
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
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)' }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Row 1 - HOW IT WORKS */}
        <div>
          <h2 className="text-[40px] sm:text-4xl font-bold text-[#162B60] mb-4">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-40">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl pt-6 transition-all duration-300">
                <h3 className="text-[18px] font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-[16px] font-medium leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - WHAT WE SOURCE */}
        <div>
          <h2 className="text-[24px] font-bold text-[#162B60] mb-4">WHAT WE SOURCE</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center rounded-xl p-4 text-center hover:shadow-md transition-all duration-300">
                <img src={cat.icon} alt="" className="mb-2" />
                <span className="text-slate-700 text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - One-Time Sourcing Fee */}
        <div>
          <h2 className="text-[24px] font-bold text-[#162B60] mb-8 uppercase">One-Time Sourcing Fee</h2>
          <div className="bg-white shadow-xl p-4">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="space-y-3 flex-1">
                {checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    ✓
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start lg:items-end gap-4 flex-1">
                <div>
                  <p className="text-4xl font-bold text-[#162B60]">$XXX</p>
                  <p className="text-slate-500">Per Product Request</p>
                </div>

                <button
                  className="flex items-center justify-between gap-3 px-20 py-3 rounded-[10px] bg-black hover:bg-[#162B60] text-white font-semibold text-[16px] transition-all duration-200 group cursor-pointer"
                >
                  Proceed to Checkout
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
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

// ── Section 3: Pricing & Form ────────────────────────────────────────────
function Section3({ onPrev, isMobile }: { onPrev: () => void; isMobile: boolean }) {
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

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-40 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #eef1fb 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Back icon - row 1 */}
        <div className="mb-12">
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md text-slate-600 hover:text-slate-900 transition-all duration-200"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div>
          <div className="space-y-6">
            <div>
              <div className="space-y-16">
                {/* Row 1 - Three fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <input type="text" placeholder="Full Name" className="bg-white p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                  <input type="email" placeholder="Email" className="p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                  <input type="tel" placeholder="WhatsApp Number" className="p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                </div>

                {/* Row 2 - Three fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="relative w-full">
                    <select
                      className="appearance-none p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full bg-white pr-10"
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    />
                  </div>
                  <input type="text" placeholder="Product Name" className="p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                  <div className="relative w-full">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full bg-white pr-10"
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Row 3 - Estimated Quantity & File Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <input type="text" placeholder="Estimated Quantity" className="p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#162B60] w-full" />
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Upload Product Image</label>
                    <input type="file" className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none" />
                  </div>
                </div>
              </div>

              {/* Row 5 - Button centered */}
              <div className="mt-12 flex justify-center">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="group flex items-center justify-center gap-2 px-6 lg:px-24 py-4 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200 bg-[#162B60] text-white hover:bg-[#162B60] cursor-pointer"
                >
                  Submit & Proceed to Payment
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
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
function Section4({ isMobile }: { isMobile: boolean }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    { q: 'How long does sourcing take?', a: 'Typically 2-5 business days depending on product complexity and supplier availability.' },
    { q: 'Do you guarantee pricing?', a: 'We negotiate the best possible prices, but final pricing is confirmed directly with suppliers.' },
    { q: 'Do you handle shipping?', a: 'We can connect you with logistics partners, but shipping arrangements are handled separately.' },
  ]

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #eef1fb 0%, #f5f0ff 100%)' }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Row 1: Why Use Remote Sourcing? */}
        <div>
          <h2 className="text-[24px] font-bold text-[#162B60] mb-6">Why Use Remote Sourcing?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
            {['✓  Save travel costs', '✓ Avoid fake suppliers', '✓ Local negotiation advantage', '✓ Faster supplier access'].map((pill) => (
              <span key={pill}
                className="text-slate-600 text-[12px] sm:text-[16px] font-medium py-2 sm:py-2.5 rounded-full text-center">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: FAQ Box */}
        <div className="bg-[#FFFFFF4D] rounded-2xl shadow-xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[#162B60] mb-6">FAQs</h3>
          <div className="space-y-3 px-14">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-slate-800">{faq.q}</span>
                  <img src={dropdown_icon} alt="" />
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-4 text-slate-600 text-sm border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: CTA Box */}
        <div className="bg-gradient-to-r from-[#b8b6b6] to-[#c7b6b6] backdrop-blur-[24.2px] rounded-2xl shadow-xl p-4 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white text-center sm:text-left w-full mb-6">
            Ready to Source From Panama Remotely?
          </h3>
          <div className="mt-2 flex justify-center">
            <Link
              to="/supplier"
              className="group flex items-center justify-center gap-2 w-full lg:px-24 py-4 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200 bg-[#162B60] text-white hover:bg-[#162B60]"
            >
              Submit your request now
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 5: Duplicate of FAQ & CTA (for layout purposes) ──────────────
function Section5({ isMobile }: { isMobile: boolean }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    { q: 'How long does sourcing take?', a: 'Typically 2-5 business days depending on product complexity and supplier availability.' },
    { q: 'Do you guarantee pricing?', a: 'We negotiate the best possible prices, but final pricing is confirmed directly with suppliers.' },
    { q: 'Do you handle shipping?', a: 'We can connect you with logistics partners, but shipping arrangements are handled separately.' },
  ]

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-10 pt-40 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #eef1fb 0%, #f5f0ff 100%)' }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Row 2: FAQ Box */}
        <div className="bg-[#FFFFFF4D] rounded-2xl shadow-xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[#162B60] mb-6">FAQs</h3>
          <div className="space-y-3 px-14">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-slate-800">{faq.q}</span>
                  <img src={dropdown_icon} alt="" />
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-4 text-slate-600 text-sm border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: CTA Box */}
        <div className="bg-gradient-to-r from-[#b8b6b6] to-[#c7b6b6] backdrop-blur-[24.2px] rounded-2xl shadow-xl p-4 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white text-center sm:text-left w-full mb-6">
            Ready to Source From Panama Remotely?
          </h3>
          <div className="mt-2 flex justify-center">
            <Link
              to="/supplier"
              className="group flex items-center justify-center gap-2 w-full lg:px-24 py-4 sm:py-3 rounded-xl text-[16px] sm:text-[13px] font-semibold transition-all duration-200 bg-[#162B60] text-white hover:bg-[#162B60]"
            >
              Explore Suppliers
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg] bg-[#B8E4FF]">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
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
        <Section1 isMobile={true} />
        <Section2 isMobile={true} />
        <Section3 onPrev={goPrev} isMobile={true} />
        <Section4 isMobile={true} />
        <Section5 isMobile={true} />
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
              <Section3 onPrev={goPrev} isMobile={false} />
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

          {/* Section 4 */}
          {currentSection === 4 && (
            <div
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[4] = el;
              }}
              className="h-screen overflow-y-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <Section5 isMobile={false} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}