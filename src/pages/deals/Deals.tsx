import { useState } from 'react'
import { Link } from 'react-router-dom'

const DEALS = [
  { id: 1, title: 'Bulk Electronics Bundle',        category: 'Electronics', discount: '35% OFF', original: '$15,000', price: '$9,750',  expires: '3 days', supplier: 'Shanghai Mfg.', hot: true  },
  { id: 2, title: 'Premium Textile Package',         category: 'Textiles',    discount: '25% OFF', original: '$8,000',  price: '$6,000',  expires: '7 days', supplier: 'EuroTextile',   hot: false },
  { id: 3, title: 'Auto Parts Clearance Sale',       category: 'Automotive',  discount: '40% OFF', original: '$20,000', price: '$12,000', expires: '1 day',  supplier: 'Apex Auto',     hot: true  },
  { id: 4, title: 'Organic Food Export Deal',        category: 'Food',        discount: '20% OFF', original: '$5,000',  price: '$4,000',  expires: '10 days',supplier: 'BioFood',       hot: false },
  { id: 5, title: 'Steel & Metal Bulk Order',        category: 'Metals',      discount: '30% OFF', original: '$25,000', price: '$17,500', expires: '5 days', supplier: 'Mumbai Steel',  hot: false },
  { id: 6, title: 'Consumer Electronics Flash Deal', category: 'Electronics', discount: '45% OFF', original: '$30,000', price: '$16,500', expires: '12 hrs', supplier: 'TechParts',     hot: true  },
]

const CATEGORIES = ['All', 'Electronics', 'Textiles', 'Automotive', 'Food', 'Metals']

export default function Deals() {
  const [category, setCategory] = useState('All')

  const filtered = DEALS.filter((d) => category === 'All' || d.category === category)

  return (
    <div className="bg-slate-950 min-h-screen">

      {/* Hero */}
      <div className="bg-slate-900 border-b border-white/10 pt-28 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Hot Deals</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">Exclusive Member Deals</h1>
          <p className="text-slate-400 text-lg max-w-2xl">Time-limited offers from our verified suppliers. Act fast before they expire.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border
                ${category === cat
                  ? 'bg-amber-400/10 border-amber-400/50 text-amber-400'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((deal) => (
            <Link
              key={deal.id}
              to={`/deals/${deal.id}`}
              className="group bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/25 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
            >
              {/* Image placeholder */}
              <div className="h-44 bg-gradient-to-br from-slate-800 to-slate-700 relative">
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">📦</div>
                {deal.hot && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    🔥 HOT
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {deal.discount}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md">{deal.category}</span>
                  <span className="text-xs text-red-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Expires in {deal.expires}
                  </span>
                </div>

                <h3 className="text-white font-semibold mb-1 group-hover:text-amber-400 transition-colors">{deal.title}</h3>
                <p className="text-slate-500 text-xs mb-4">by {deal.supplier}</p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-slate-500 text-xs line-through">{deal.original}</p>
                    <p className="text-amber-400 font-bold text-xl">{deal.price}</p>
                  </div>
                  <span className="text-xs px-3 py-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg font-medium group-hover:bg-amber-400 group-hover:text-slate-900 transition-all duration-200">
                    View Deal →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}