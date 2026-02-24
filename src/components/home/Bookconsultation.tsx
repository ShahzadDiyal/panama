import { useState } from 'react'

export default function BookConsultation() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // API integration in Step 3
    setSubmitted(true)
  }

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left - info */}
            <div className="p-10 lg:p-14">
              <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
              <h2 className="text-4xl font-bold text-white mt-3 mb-4">
                Book a Free Consultation
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Talk to our sourcing experts and discover how Paname can streamline your supply chain and unlock new opportunities.
              </p>

              <div className="space-y-4">
                {[
                  { icon: '🎯', text: 'Personalized sourcing strategy' },
                  { icon: '⚡', text: 'Same-day expert callback' },
                  { icon: '🔒', text: '100% confidential' },
                  { icon: '💰', text: 'No commitment required' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - form */}
            <div className="bg-slate-900/50 p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-white/10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Work Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">What are you looking for?</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your sourcing needs..."
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold text-sm rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
                  >
                    Book My Free Consultation
                  </button>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 bg-green-400/10 border border-green-400/20 rounded-2xl flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">You're all set!</h3>
                  <p className="text-slate-400 text-sm">Our team will contact you within 24 hours.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}