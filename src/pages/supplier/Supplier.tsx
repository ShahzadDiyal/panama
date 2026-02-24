import { useState } from 'react'
import { Link } from 'react-router-dom'

const SUPPLIERS = [
  { id: 1, name: 'Shanghai Manufacturing Co.', category: 'Electronics', country: '🇨🇳 China', rating: 4.9, reviews: 312, moq: '$5,000', verified: true, tags: ['ISO 9001', 'Fast Ship'] },
  { id: 2, name: 'TechParts Global',            category: 'Components',  country: '🇰🇷 South Korea', rating: 4.8, reviews: 198, moq: '$2,500', verified: true, tags: ['CE Certified', 'OEM'] },
  { id: 3, name: 'EuroTextile Solutions',       category: 'Textiles',    country: '🇩🇪 Germany',      rating: 4.7, reviews: 145, moq: '$1,000', verified: true, tags: ['GOTS', 'Sustainable'] },
  { id: 4, name: 'Mumbai Steel Works',          category: 'Metals',      country: '🇮🇳 India',        rating: 4.6, reviews: 89,  moq: '$3,000', verified: false, tags: ['BIS Certified'] },
  { id: 5, name: 'BioFood Exports Ltd',         category: 'Food',        country: '🇧🇷 Brazil',       rating: 4.8, reviews: 221, moq: '$500',   verified: true, tags: ['Organic', 'FDA'] },
  { id: 6, name: 'Apex Auto Parts',             category: 'Automotive',  country: '🇯🇵 Japan',        rating: 4.9, reviews: 407, moq: '$10,000',verified: true, tags: ['JIS', 'OEM'] },
]

const CATEGORIES = ['All', 'Electronics', 'Components', 'Textiles', 'Metals', 'Food', 'Automotive']

export default function Supplier() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')

  const filtered = SUPPLIERS.filter((s) => {
    const matchSearch   = s.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || s.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="bg-slate-950 min-h-screen">

      {/* Page Header */}
      <div className="bg-slate-900 border-b border-white/10 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Suppliers</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">Verified Supplier Network</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Browse thousands of pre-vetted suppliers across all industries and regions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
          </div>
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
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
        </div>

        {/* Results count */}
        <p className="text-slate-400 text-sm mb-6">{filtered.length} suppliers found</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((supplier) => (
            <Link
              key={supplier.id}
              to={`/supplier/${supplier.id}`}
              className="group bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-amber-400/25 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {supplier.name[0]}
                </div>
                {supplier.verified && (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>

              <h3 className="text-white font-semibold text-base mb-1 group-hover:text-amber-400 transition-colors">{supplier.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{supplier.country} · {supplier.category}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {supplier.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-slate-800 border border-white/10 text-slate-400 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-sm font-medium">{supplier.rating}</span>
                  <span className="text-slate-500 text-xs">({supplier.reviews})</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Min. Order</p>
                  <p className="text-amber-400 text-sm font-semibold">{supplier.moq}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}