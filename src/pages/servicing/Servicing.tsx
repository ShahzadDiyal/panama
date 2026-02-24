import { Link } from 'react-router-dom'

const services = [
  { icon: '🚢', title: 'Logistics & Freight',    description: 'End-to-end freight management including ocean, air, and road — with real-time tracking.' },
  { icon: '🔬', title: 'Quality Inspection',     description: 'Pre-shipment inspections, factory audits, and product testing by certified inspectors.' },
  { icon: '📋', title: 'Compliance & Legal',     description: 'Customs documentation, import/export compliance, and legal contract templates.' },
  { icon: '💳', title: 'Trade Finance',          description: 'Flexible payment terms, letters of credit, and escrow services to protect your transactions.' },
  { icon: '📦', title: 'Order Management',       description: 'Centralized order tracking, delivery updates, and dispute resolution support.' },
  { icon: '🤝', title: 'Supplier Relations',     description: 'Ongoing supplier management, performance monitoring, and relationship building.' },
]

export default function Servicing() {
  return (
    <div className="bg-slate-950 min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-900 border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Servicing</span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mt-3 mb-5">
            Full-Service{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Supply Chain</span>{' '}
            Support
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            From logistics and quality control to compliance and trade finance — we handle the complexity so you don't have to.
          </p>
          <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg">
            Get Full Service Access
          </Link>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-slate-400 text-lg">Everything you need from first contact to final delivery.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-purple-400/25 hover:-translate-y-1 transition-all duration-300 group">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-purple-400 transition-colors">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Let us handle the complexity</h2>
          <p className="text-slate-400 mb-8">Book a free consultation and discover how our full-service offering can transform your supply chain.</p>
          <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg">
            Book a Consultation →
          </Link>
        </div>
      </section>

    </div>
  )
}