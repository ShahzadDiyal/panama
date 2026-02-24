import { useParams, Link } from 'react-router-dom'

export default function DealDetails() {
  const { id } = useParams()

  const deal = {
    id,
    title: 'Bulk Electronics Bundle',
    category: 'Electronics',
    discount: '35% OFF',
    original: '$15,000',
    price: '$9,750',
    expires: '3 days',
    supplier: 'Shanghai Manufacturing Co.',
    description: 'A premium electronics bundle including high-grade circuit boards, LED modules, and custom PCBs. Perfect for medium to large manufacturing operations. All components are CE certified and RoHS compliant.',
    includes: ['500x Circuit Boards', '200x LED Modules', '100x Custom PCBs', '50x Power Supply Units', 'Free Shipping'],
    moq: 1,
    stock: 12,
  }

  return (
    <div className="bg-slate-950 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <Link to="/deals" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 group transition-colors">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Deals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl h-72 relative overflow-hidden flex items-center justify-center">
              <span className="text-8xl opacity-20">📦</span>
              <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">{deal.discount}</div>
              <div className="absolute top-4 right-4 text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-1.5 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Expires in {deal.expires}
              </div>
            </div>

            {/* Info */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-7">
              <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-md">{deal.category}</span>
              <h1 className="text-3xl font-bold text-white mt-3 mb-2">{deal.title}</h1>
              <p className="text-slate-400 text-sm mb-1">By <Link to="/supplier/1" className="text-amber-400 hover:text-amber-300">{deal.supplier}</Link></p>
              <p className="text-slate-300 text-sm leading-relaxed mt-4">{deal.description}</p>
            </div>

            {/* What's included */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-7">
              <h2 className="text-lg font-bold text-white mb-4">What's Included</h2>
              <ul className="space-y-3">
                {deal.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sticky top-24">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <div className="mb-5">
                <p className="text-slate-400 text-sm line-through">{deal.original}</p>
                <p className="text-4xl font-bold text-amber-400">{deal.price}</p>
                <p className="text-green-400 text-sm font-medium mt-1">You save $5,250</p>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Availability</span>
                  <span className="text-white font-medium">{deal.stock} left</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Min. Quantity</span>
                  <span className="text-white font-medium">{deal.moq}</span>
                </div>
              </div>

              {/* Stock bar */}
              <div className="mb-6">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-red-400 rounded-full" style={{ width: '25%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Only {deal.stock} remaining — selling fast!</p>
              </div>

              <button className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold text-sm rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 mb-3 shadow-lg hover:shadow-amber-500/25">
                Claim This Deal
              </button>
              <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-xl hover:bg-white/10 transition-all duration-200">
                Contact Supplier
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}