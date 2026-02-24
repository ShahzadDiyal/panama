import { useState } from 'react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for small businesses exploring global sourcing.',
    color: 'border-white/10',
    badge: null,
    features: [
      'Up to 10 supplier inquiries/month',
      'Access to supplier directory',
      'Basic deal browsing',
      'Email support',
      '1 user seat',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'bg-white/5 border border-white/15 text-white hover:bg-white/10',
  },
  {
    name: 'Professional',
    price: { monthly: 99, annual: 79 },
    description: 'For growing businesses that need powerful sourcing tools.',
    color: 'border-amber-400/50',
    badge: 'Most Popular',
    features: [
      'Unlimited supplier inquiries',
      'Priority supplier matching',
      'Exclusive deals access',
      'Quality inspection reports',
      'Dedicated account manager',
      '5 user seats',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:from-amber-300 hover:to-amber-400 shadow-lg hover:shadow-amber-500/25',
  },
  {
    name: 'Enterprise',
    price: { monthly: 299, annual: 239 },
    description: 'Full-service solution for large-scale sourcing operations.',
    color: 'border-white/10',
    badge: null,
    features: [
      'Everything in Professional',
      'Custom sourcing projects',
      'Full logistics management',
      'Trade finance support',
      'Legal & compliance help',
      'Unlimited user seats',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'bg-white/5 border border-white/15 text-white hover:bg-white/10',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="bg-slate-950 min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Pricing</span>
          <h1 className="text-5xl font-bold text-white mt-3 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-slate-400 text-lg mb-8">Start for free. Scale as you grow. No hidden fees.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${!annual ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Annual
              <span className="text-xs bg-green-400/20 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-slate-900 border-2 ${plan.color} rounded-2xl p-8 ${plan.badge ? 'shadow-2xl shadow-amber-500/10' : ''}`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.price.monthly === 0 ? (
                    <span className="text-4xl font-bold text-white">Free</span>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-white">
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-slate-400 text-sm mb-1.5">/month</span>
                    </div>
                  )}
                  {annual && plan.price.monthly > 0 && (
                    <p className="text-green-400 text-xs mt-1">
                      Billed annually (${(annual ? plan.price.annual : plan.price.monthly) * 12}/yr)
                    </p>
                  )}
                </div>

                <Link
                  to={plan.name === 'Enterprise' ? '/#consultation' : '/register'}
                  className={`w-full block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 mb-7 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ note */}
      <section className="py-12 bg-slate-900 border-t border-white/10 text-center">
        <p className="text-slate-400 text-sm">
          Have questions?{' '}
          <Link to="/#faq" className="text-amber-400 hover:text-amber-300 font-medium">Read our FAQ</Link>
          {' '}or{' '}
          <Link to="/#consultation" className="text-amber-400 hover:text-amber-300 font-medium">talk to our team</Link>
        </p>
      </section>

    </div>
  )
}