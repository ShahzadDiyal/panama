import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium">Trusted by 2,000+ businesses worldwide</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Source Smarter.{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Deal Better.
            </span>{' '}
            Grow Faster.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Paname connects you with verified global suppliers, exclusive deals, and end-to-end sourcing services — all in one powerful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1 text-base"
            >
              Get Started Free
            </Link>
            <Link
              to="/supplier"
              className="px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-200 text-base flex items-center gap-2"
            >
              Browse Suppliers
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm">
            {['No credit card required', 'Free 14-day trial', 'Cancel anytime'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>

        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/60">
            {/* Browser bar */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4 bg-slate-800 rounded-md h-7 flex items-center px-3">
                <span className="text-slate-500 text-xs">app.paname.com/dashboard</span>
              </div>
            </div>
            {/* Dashboard mock */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Active Deals',    value: '142', color: 'text-amber-400' },
                { label: 'Suppliers',       value: '890', color: 'text-blue-400' },
                { label: 'Orders',          value: '2.4k', color: 'text-green-400' },
                { label: 'Revenue',         value: '$1.2M', color: 'text-purple-400' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-800 rounded-xl p-4">
                  <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
            {/* Chart mock */}
            <div className="bg-slate-800 rounded-xl p-4 h-32 flex items-end gap-1">
              {[40,65,50,80,60,90,75,85,70,95,80,100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-amber-500/60 to-amber-400/20 rounded-sm"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          {/* Glow under dashboard */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-amber-500/15 blur-2xl rounded-full" />
        </div>

      </div>
    </section>
  )
}