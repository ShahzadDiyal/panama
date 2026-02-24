import { Link } from 'react-router-dom'

const features = [
  { icon: '🔍', title: 'AI-Powered Matching',  description: 'Our algorithm analyzes your requirements and matches you with the most relevant verified suppliers instantly.' },
  { icon: '🌍', title: 'Global Reach',          description: 'Access suppliers from 150+ countries across every major industry sector.' },
  { icon: '✅', title: 'Quality Assurance',     description: 'Every supplier is pre-vetted. We conduct factory audits, certification checks, and reference interviews.' },
  { icon: '⚡', title: 'Fast Turnaround',       description: 'Get shortlisted suppliers within 24 hours and first quotes within 48 hours.' },
  { icon: '💬', title: 'Expert Guidance',       description: 'Our sourcing consultants support you at every step — from RFQ to final contract.' },
  { icon: '📊', title: 'Market Intelligence',   description: 'Real-time pricing data and market trends to help you negotiate the best deals.' },
]

export default function Sourcing() {
  return (
    <div className="bg-slate-950 min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-900 border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Sourcing</span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mt-3 mb-5">
            Find the Right Supplier,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Every Time</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Paname's sourcing service connects you with verified global suppliers in record time, so you can focus on growing your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg hover:shadow-amber-500/30">
              Start Sourcing Free
            </Link>
            <Link to="/#consultation" className="px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why source with Paname?</h2>
            <p className="text-slate-400 text-lg">We've built the most reliable sourcing platform for B2B businesses.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-blue-400/25 hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start sourcing?</h2>
          <p className="text-slate-400 mb-8">Join thousands of businesses that trust Paname for their global sourcing needs.</p>
          <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg">
            Get Started Free →
          </Link>
        </div>
      </section>

    </div>
  )
}