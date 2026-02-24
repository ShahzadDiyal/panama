const steps = [
  {
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up for free and tell us about your business needs and sourcing requirements.',
  },
  {
    step: '02',
    title: 'Browse & Discover',
    description: 'Explore thousands of verified suppliers and exclusive deals tailored to your industry.',
  },
  {
    step: '03',
    title: 'Connect & Negotiate',
    description: 'Reach out directly to suppliers, request quotes, and negotiate the best terms.',
  },
  {
    step: '04',
    title: 'Close & Scale',
    description: 'Finalize deals with confidence using our secure platform and expert support team.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">How It Works</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Get started in 4 simple steps
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From registration to closing your first deal — it's faster than you think.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              {/* Step number */}
              <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-amber-400/30 flex items-center justify-center mb-6 group-hover:border-amber-400/70 group-hover:bg-amber-400/10 transition-all duration-300 relative z-10">
                <span className="text-2xl font-bold text-amber-400">{step.step}</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}