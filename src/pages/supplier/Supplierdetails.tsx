import { useParams, Link } from 'react-router-dom'

export default function SupplierDetails() {
  const { id } = useParams()

  // Static mock — replace with API call in Step 3
  const supplier = {
    id,
    name: 'Shanghai Manufacturing Co.',
    category: 'Electronics',
    country: '🇨🇳 China',
    rating: 4.9,
    reviews: 312,
    moq: '$5,000',
    verified: true,
    founded: 2005,
    employees: '500-1000',
    responseTime: '< 2 hours',
    description: 'Shanghai Manufacturing Co. is a leading electronics manufacturer specializing in consumer electronics, industrial components, and custom OEM/ODM solutions. With over 18 years of experience, we serve clients across 60+ countries.',
    tags: ['ISO 9001', 'Fast Ship', 'CE Certified', 'RoHS Compliant'],
    products: ['Circuit Boards', 'Power Supplies', 'Sensors', 'Custom PCBs', 'LED Modules'],
    certifications: ['ISO 9001:2015', 'ISO 14001', 'CE', 'RoHS', 'UL Listed'],
  }

  return (
    <div className="bg-slate-950 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back */}
        <Link
          to="/supplier"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 group transition-colors"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Suppliers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header card */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-7">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-slate-900 font-bold text-2xl">
                    {supplier.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold text-white">{supplier.name}</h1>
                      {supplier.verified && (
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{supplier.country} · {supplier.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-xl">
                  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-amber-400 font-semibold text-sm">{supplier.rating}</span>
                  <span className="text-slate-400 text-xs">({supplier.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mt-5">{supplier.description}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {supplier.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-slate-800 border border-white/10 text-slate-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-7">
              <h2 className="text-lg font-bold text-white mb-4">Products & Services</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {supplier.products.map((product) => (
                  <div key={product} className="flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{product}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-7">
              <h2 className="text-lg font-bold text-white mb-4">Certifications</h2>
              <div className="flex flex-wrap gap-2">
                {supplier.certifications.map((cert) => (
                  <span key={cert} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-green-400/10 border border-green-400/20 text-green-300 rounded-xl">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {cert}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact card */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-semibold mb-5">Contact Supplier</h3>
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Min. Order', value: supplier.moq },
                  { label: 'Founded',   value: supplier.founded },
                  { label: 'Employees', value: supplier.employees },
                  { label: 'Response',  value: supplier.responseTime },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold text-sm rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 mb-3">
                Send Inquiry
              </button>
              <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-xl hover:bg-white/10 transition-all duration-200">
                Request Quote
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}