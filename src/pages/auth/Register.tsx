import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'buyer' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // API integration in Step 3
    console.log('Register:', form)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
          <p className="text-slate-400 text-sm">Join Paname and start sourcing smarter</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              {['buyer', 'supplier'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setForm({ ...form, role })}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-200 capitalize
                    ${form.role === role
                      ? 'bg-amber-400/10 border-amber-400/60 text-amber-400'
                      : 'bg-slate-800 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-slate-500">
            By creating an account, you agree to our{' '}
            <Link to="/" className="text-amber-400 hover:text-amber-300">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/" className="text-amber-400 hover:text-amber-300">Privacy Policy</Link>.
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold text-sm rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}