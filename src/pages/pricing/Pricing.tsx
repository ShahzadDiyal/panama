import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useNavbar } from '../../context/NavbarContext'
import { publicService } from '../../services/publicService'
import { subscriptionService } from '../../services/subscriptionService'
import { useAuth } from '../../context/AuthContext'
import type { Plan } from '../../types'

// Assets
import pricing_illustrator from '../../assets/pricing_herosection_img.svg'
import arrow_icon from '../../assets/arrow_left_icon.svg'

// ── Section 1: Hero ──────────────────────────────────────────────────────
function Section1({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(160deg, #FDFDFD 0%, #f5f0ff 60%, #CDE7FF 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-4 sm:px-6 md:px-10 py-12 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
            <div className="flex flex-col items-start text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-slate-800 leading-snug mb-2 sm:mb-3">
                Unlock Full Access to <br className="hidden sm:block" /> Verified Panama Suppliers
              </h3>
              <p className="text-slate-700 text-sm sm:text-[15px] font-semibold leading-relaxed">
                Choose the plan that fits your business needs and start sourcing directly from trusted suppliers.
              </p>
              <div className="mt-4 sm:mt-8 w-full flex justify-center lg:justify-start">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-3 bg-[#162B60] hover:bg-blue-900
                    text-white font-semibold px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-[20px] text-sm sm:text-[15px]
                    transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Start a Sourcing Request
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#CFF6FF] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
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

// Helper function to check if subscription is valid
const isSubscriptionValid = (subscription: any): boolean => {
  if (!subscription) return false;
  if (subscription.status !== 'active') return false;
  
  // Check if expires_at exists and is not expired
  if (subscription.expires_at) {
    const expiryDate = new Date(subscription.expires_at);
    const now = new Date();
    return expiryDate > now;
  }
  
  return true;
};

// ── Section 2: Pricing Cards (first occurrence) ──────────────────────────
function Section2({ isMobile }: { isMobile: boolean }) {
  const { user, subscription, refreshSubscription } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [subscribing, setSubscribing] = useState<number | null>(null)

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await publicService.getPlans()
        // Filter only active plans
        const activePlans = data.filter(plan => plan.is_active === 1)
        setPlans(activePlans)
      } catch (err) {
        console.error('Failed to fetch plans', err)
        setError('Failed to load pricing plans')
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  const handleSubscribe = async (planId: number) => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    // Check if user already has a valid subscription for this exact plan
    if (subscription && isSubscriptionValid(subscription) && subscription.plan_id === planId) {
      alert('You already have an active subscription for this plan!')
      return
    }

    try {
      setSubscribing(planId)

      if (subscription && isSubscriptionValid(subscription)) {
        // User has existing valid subscription - use upgrade
        await subscriptionService.upgrade(planId)
        await refreshSubscription()
        alert('Plan upgraded successfully!')
      } else {
        // User has no valid subscription - use checkout (redirects to Stripe)
        const { checkout_url } = await subscriptionService.checkout(planId)
        // Redirect to Stripe Checkout
        window.location.href = checkout_url
        return // Don't refresh subscription yet - will happen after payment
      }

    } catch (err: any) {
      console.error('Subscription failed', err)
      const errorMessage = err.response?.data?.message || 'Failed to process subscription. Please try again.'
      alert(errorMessage)
    } finally {
      setSubscribing(null)
    }
  }

  // Check if user has a valid active plan (not expired)
  const hasValidActivePlan = (planId: number) => {
    return subscription && isSubscriptionValid(subscription) && subscription.plan_id === planId;
  }

  // Map API plan to the format expected by the UI
  const getPlanDisplay = (plan: Plan, _index: number) => {
    const formattedPrice = parseFloat(plan.price).toFixed(2)

    // Map based on plan_name
    if (plan.plan_name === 'Day Pass') {
      return {
        id: plan.id,
        name: 'Day Pass',
        tagline: 'Trial and quick exploration',
        features: [
          'Full supplier directory access',
          'Wholesale deals access',
          'Request quotes from suppliers',
          'Contact suppliers via WhatsApp'
        ],
        duration: '24 Hours Access',
        price: `$${formattedPrice}`,
        buttonText: 'Get Day Pass',
        popular: false
      }
    } else if (plan.plan_name === 'Monthly') {
      return {
        id: plan.id,
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
        price: `$${formattedPrice}`,
        buttonText: 'Start Monthly Plan',
        popular: false
      }
    } else if (plan.plan_name === 'Yearly') {
      return {
        id: plan.id,
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
        price: `$${formattedPrice}`,
        buttonText: 'Start Yearly Plan',
        popular: true
      }
    }

    // Fallback
    return {
      id: plan.id,
      name: plan.plan_name,
      tagline: plan.description,
      features: [plan.description],
      duration: `${plan.validity_value} ${plan.validity_unit}(s)`,
      price: `$${formattedPrice}`,
      buttonText: `Get ${plan.plan_name}`,
      popular: false
    }
  }

  const isPlanActive = (planId: number) => {
    return hasValidActivePlan(planId)
  }

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-36 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #eef1fb 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Trust badges */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-6 lg:px-20">
            {['Secure payments', 'Cancel anytime', 'Direct supplier access', 'No hidden fees'].map((pill) => (
              <span key={pill}
                className="text-slate-600 text-xs sm:text-sm lg:text-[16px] font-medium bg-[#FFFFFF80] py-2 px-2 rounded-full text-center">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#162B60]"></div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#162B60] text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No plans state */}
        {!loading && !error && plans.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">No pricing plans available at the moment.</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {plans.map((plan, index) => {
              const display = getPlanDisplay(plan, index)
              const isActive = isPlanActive(plan.id)

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col ${
                    isActive ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ACTIVE
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{display.name}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mb-4">{display.tagline}</p>

                  <ul className="flex-1 mb-6 space-y-1">
                    {display.features.map((feature, i) => (
                      <li key={i} className="flex items-start font-semibold gap-2 text-slate-700">
                        <span className="text-green-600 font-bold text-base sm:text-lg flex-shrink-0">✓</span>
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-xs sm:text-sm font-medium">{display.duration}</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#162B60]">{display.price}</span>
                  </div>

                  {isActive ? (
                    <div className="w-full text-center py-3 px-4 bg-green-100 text-green-800 font-medium rounded-xl">
                      Current Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(display.id)}
                      disabled={subscribing === display.id}
                      className="w-full flex items-center justify-between gap-2 bg-[#E9F6FE] hover:bg-blue-900 
                      hover:text-white text-black font-semibold px-4 py-3 sm:px-5 sm:py-3 rounded-[5px] 
                      transition-all duration-200 group text-sm sm:text-base border
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {subscribing === display.id ? 'Processing...' : display.buttonText}
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white group-hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all">
                        <img src={arrow_icon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Section 3: Pricing Cards (second occurrence) ─────────────────────────
function Section3({ isMobile }: { isMobile: boolean }) {
  const { user, subscription, refreshSubscription } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [subscribing, setSubscribing] = useState<number | null>(null)

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await publicService.getPlans()
        // Filter only active plans
        const activePlans = data.filter(plan => plan.is_active === 1)
        setPlans(activePlans)
      } catch (err) {
        console.error('Failed to fetch plans', err)
        setError('Failed to load pricing plans')
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  const handleSubscribe = async (planId: number) => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    // Check if user already has a valid subscription for this exact plan
    if (subscription && isSubscriptionValid(subscription) && subscription.plan_id === planId) {
      alert('You already have an active subscription for this plan!')
      return
    }

    try {
      setSubscribing(planId)

      if (subscription && isSubscriptionValid(subscription)) {
        // User has existing valid subscription - use upgrade
        await subscriptionService.upgrade(planId)
        await refreshSubscription()
        alert('Plan upgraded successfully!')
      } else {
        // User has no valid subscription - use checkout (redirects to Stripe)
        const { checkout_url } = await subscriptionService.checkout(planId)
        // Redirect to Stripe Checkout
        window.location.href = checkout_url
        return // Don't refresh subscription yet - will happen after payment
      }

    } catch (err: any) {
      console.error('Subscription failed', err)
      const errorMessage = err.response?.data?.message || 'Failed to process subscription. Please try again.'
      alert(errorMessage)
    } finally {
      setSubscribing(null)
    }
  }

  // Check if user has a valid active plan (not expired)
  const hasValidActivePlan = (planId: number) => {
    return subscription && isSubscriptionValid(subscription) && subscription.plan_id === planId;
  }

  // Map API plan to the format expected by the UI
  const getPlanDisplay = (plan: Plan, _index: number) => {
    const formattedPrice = parseFloat(plan.price).toFixed(2)

    // Map based on plan_name
    if (plan.plan_name === 'Day Pass') {
      return {
        id: plan.id,
        name: 'Day Pass',
        tagline: 'Trial and quick exploration',
        features: [
          'Full supplier directory access',
          'Wholesale deals access',
          'Request quotes from suppliers',
          'Contact suppliers via WhatsApp'
        ],
        duration: '24 Hours Access',
        price: `$${formattedPrice}`,
        buttonText: 'Get Day Pass',
        popular: false
      }
    } else if (plan.plan_name === 'Monthly') {
      return {
        id: plan.id,
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
        price: `$${formattedPrice}`,
        buttonText: 'Start Monthly Plan',
        popular: false
      }
    } else if (plan.plan_name === 'Yearly') {
      return {
        id: plan.id,
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
        price: `$${formattedPrice}`,
        buttonText: 'Start Yearly Plan',
        popular: true
      }
    }

    // Fallback
    return {
      id: plan.id,
      name: plan.plan_name,
      tagline: plan.description,
      features: [plan.description],
      duration: `${plan.validity_value} ${plan.validity_unit}(s)`,
      price: `$${formattedPrice}`,
      buttonText: `Get ${plan.plan_name}`,
      popular: false
    }
  }

  const isPlanActive = (planId: number) => {
    return hasValidActivePlan(planId)
  }

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 pt-24 sm:pt-28 ${!isMobile ? '' : ''}`}
      style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #eef1fb 100%)' }}
    >
      <div className="max-w-7xl mx-auto pt-12 sm:pt-20">
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#162B60]"></div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#162B60] text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No plans state */}
        {!loading && !error && plans.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">No pricing plans available at the moment.</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {plans.map((plan, index) => {
              const display = getPlanDisplay(plan, index)
              const isActive = isPlanActive(plan.id)

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col ${
                    isActive ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ACTIVE
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{display.name}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mb-4">{display.tagline}</p>

                  <ul className="flex-1 mb-6 space-y-2">
                    {display.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <span className="text-green-600 font-bold text-base sm:text-lg flex-shrink-0">✓</span>
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-xs sm:text-sm font-medium">{display.duration}</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#162B60]">{display.price}</span>
                  </div>

                  {isActive ? (
                    <div className="w-full text-center py-3 px-4 bg-green-100 text-green-800 font-medium rounded-xl">
                      Current Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(display.id)}
                      disabled={subscribing === display.id}
                      className="w-full flex items-center justify-between gap-2 bg-[#E9F6FE] 
                      hover:bg-blue-900 hover:text-white text-black font-semibold px-4 py-2.5 
                      sm:px-5 sm:py-3 rounded-[5px] border cursor-pointer transition-all duration-200 group text-sm sm:text-base 
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {subscribing === display.id ? 'Processing...' : display.buttonText}
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white group-hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all">
                        <img src={arrow_icon} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Component with 3 sections ───────────────────────────────────────
const TOTAL_SECTIONS = 3

export default function Pricing() {
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

  // Mobile: stacked sections
  if (isMobile) {
    return (
      <div className="w-full">
        <Section1 isMobile={true} />
        <Section2 isMobile={true} />
        <Section3 isMobile={true} />
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
              <Section3 isMobile={false} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}