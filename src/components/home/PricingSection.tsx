import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { publicService } from '../../services/publicService'
import type { Plan } from '../../types'

import msgIcon from '../../assets/msg_icon.png'
import ideas_icon from '../../assets/ideas_icon.png'
import traveling_icon from '../../assets/traveling_icon.png'

// ── Types ─────────────────────────────────────────────────────────────────
interface Service {
  title: string
  description: string
  icon: React.ReactNode
}

// ── Data (services remain static as they're not from API) ─────────────────
const services: Service[] = [
  {
    title: 'Business Consulting with Ishmael',
    description: 'One-on-one guidance for sourcing and Panama market entry.',
    icon: (
      <img src={msgIcon} alt="" />
    ),
  },
  {
    title: 'AI Business Idea Validation',
    description: 'Validate products and ideas before investing capital.',
    icon: (
      <img src={ideas_icon} alt="" />
    ),
  },
  {
    title: 'Panama Business Tours',
    description: 'Curated supplier tours and factory visits.',
    icon: (
      <img src={traveling_icon} alt="" />
    ),
  },
]

// ── PricingSection ────────────────────────────────────────────────────────
const PricingSection = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  // Map API plans to the format expected by the UI
  const getPlanDisplay = (plan: Plan) => {
    // Format price with 2 decimal places
    const formattedPrice = parseFloat(plan.price).toFixed(2)

    // Map plan_name to the expected title format
    let title = `${plan.plan_name}`
    let subtitle = ''

    // Add appropriate subtitle based on plan
    if (plan.plan_name === 'Monthly') {
      subtitle = '– Business Builder'
    } else if (plan.plan_name === 'Yearly') {
      subtitle = '– Best Value'
    }

    // Create features based on plan
    const features = []

    // Common feature
    features.push(`${plan.validity_value} ${plan.validity_unit} access`)

    // Add plan-specific features
    if (plan.plan_name === 'Day Pass') {
      features.push('Suppliers & Deals access')
      features.push('WhatsApp Contact')
    } else if (plan.plan_name === 'Monthly') {
      features.push('Full supplier directory access')
      features.push('Business Idea Validation tools')
      features.push('Workshop & education access')
      features.push('New supplier updates')
    } else if (plan.plan_name === 'Yearly') {
      features.push('Everything in Monthly')
      features.push('Priority access to new suppliers')
      features.push('Best value pricing')
    }

    return {
      title: `$${formattedPrice} ${title}`,
      subtitle: subtitle,
      features: features.slice(0, 3), // Limit to 3 features to maintain UI consistency
      price: formattedPrice,
      currency: plan.currency,
      id: plan.id
    }
  }

  return (
    // Light blue-gray gradient background matching screenshot
    <section
      className="w-full py-12 sm:py-30"
      style={{ background: 'linear-gradient(135deg, #EBF3FB 0%, #D6EAF8 50%, #EBF3FB 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Large watermark numbers — decorative, right side */}
        <span
          className="absolute right-0 top-0 text-[160px] sm:text-[220px] font-black
            text-slate-200/70 leading-none select-none pointer-events-none hidden sm:block"
          aria-hidden="true"
        >
          0
        </span>

        {/* ── Business Support Section ── */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">
          Business Support Beyond Sourcing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-22 mb-12 sm:mb-16 relative z-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm
                p-5 sm:p-6 flex flex-col justify-between min-h-[140px] 
                hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <h3 className="font-semibold text-slate-800 text-[16px] mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-[#33333366] text-[16px] font-semibold leading-relaxed max-w-[220px]">
                  {service.description}
                </p>
              </div>
              <div className="flex justify-end">
                {service.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-10 sm:mb-12" />

        {/* Large watermark number 3 */}
        <span
          className="absolute right-0 bottom-0 text-[160px] sm:text-[220px] font-black
            text-slate-200/70 leading-none select-none pointer-events-none hidden sm:block"
          aria-hidden="true"
        >
          3
        </span>

        {/* ── Pricing Section ── */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-6 sm:mb-8 relative z-10">
          Simple Access Pricing
        </h2>

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

        {/* Pricing cards */}
        {!loading && !error && plans.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 relative z-10">
            {plans.map((plan) => {
              const display = getPlanDisplay(plan)
              return (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm
                    p-5 sm:p-6 flex flex-col justify-between min-h-[340px] sm:min-h-[380px]
                    hover:shadow-md transition-shadow duration-200"
                >
                  {/* Plan title */}
                  <div className="mb-6">
                    <h3 className="font-bold text-slate-800 text-[18px] sm:text-[20px] leading-snug">
                      {display.title}
                      {display.subtitle && (
                        <>
                          <br />
                          <span className="font-bold">{display.subtitle}</span>
                        </>
                      )}
                    </h3>

                    {/* Features list */}
                    <ul className="mt-5 sm:mt-6 space-y-2">
                      {display.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-[#33333399] text-[16px] font-semibold">
                          <span className='text-black'>✔</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <Link
                    to={`/pricing?plan=${plan.id}`}
                    className="group flex items-center justify-between w-full
                      px-5 py-3.5 rounded-xl border border-slate-200
                      hover:bg-slate-800 hover:border-slate-800 hover:text-white
                      text-slate-700 text-[13px] sm:text-[14px] font-medium
                      transition-all duration-200"
                  >
                    Get Access Now
                    <svg
                      className="w-8 h-8 transition-transform duration-300 group-hover:rotate-310 bg-[#CFF6FF] rounded-full text-black p-1"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default PricingSection