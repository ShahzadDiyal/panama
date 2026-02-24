const stats = [
  { value: '10,000+', label: 'Verified Suppliers' },
  { value: '$500M+',  label: 'Deals Facilitated' },
  { value: '150+',    label: 'Countries Covered' },
  { value: '98%',     label: 'Client Satisfaction' },
]

export default function StatsSection() {
  return (
    <section className="bg-slate-900 border-y border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}