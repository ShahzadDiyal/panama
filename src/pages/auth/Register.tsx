import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo/panama.png'
import bgImage from '../../assets/auth bg.png'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer'
  })
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Register:', { ...form, rememberMe })
  }

  return (
    <div className="min-h-screen bg-[#93AEFF] flex overflow-hidden " style={{
      backgroundImage: `linear-gradient(160deg, rgba(147, 174, 255, 0.5) 0%, rgba(255, 255, 255, 0.9) 80%))`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>
      {/* Left Section - with background image - 65% width */}
      <div className="hidden lg:flex lg:w-[65%] relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(182deg, rgba(147, 174, 255, 0.5) 0%, rgba(255, 255, 255, 0.9) 80%), url(${bgImage})`,
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        {/* Logo on left top */}
        <div className="absolute top-8 left-8">
          <img src={logo} alt="Panama Wholesale" className='w-60' />
        </div>

        {/* Content centered vertically */}
        <div className="absolute inset-0 flex items-center px-10">
          <div className="px-12 max-w-[900px]">
            <h2 className="text-5xl font-bold text-black mb-10 leading-tight">
              Start Sourcing from Verified Panama Suppliers
            </h2>
            <p className="text-xl text-black/50 font-semibold text-lg mb-10 leading-relaxed max-w-[400px]">
              Access wholesale deals, contact suppliers, and grow your business with trusted sourcing.
            </p>
            <ul className="space-y-8">
              {[
                'Verified suppliers',
                'Direct WhatsApp contact',
                'Exclusive wholesale deals'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-black text-lg font-semibold">
                  <svg className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Section - White background - 35% width */}
      <div
        className="w-full lg:w-[35%] flex items-center justify-center p-8 bg-white shadow-xl rounded-tl-[50%] relative z-10 overflow-y-auto"
        style={{ borderTopLeftRadius: '40px' }}
      >
        <div className="w-full max-w-xl py-4">
          {/* Mobile Logo (visible only on mobile) */}
          <div className="lg:hidden text-center mb-8">
            <img src={logo} alt="Panama Wholesale" className="w-48 mx-auto" />
          </div>

          {/* Welcome Back Header */}
          <div className="mb-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h3>
            <p className="text-gray-400 font-semibold">Join Panama Wholesale today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* First Name & Last Name Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F53FF]/20 focus:border-[#1F53FF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F53FF]/20 focus:border-[#1F53FF] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className='mb-4'>
              <label className="block text-md font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F53FF]/20 focus:border-[#1F53FF] transition-colors"
              />
            </div>

            {/* Role Selection */}
            <div className='mb-4'>
              <label className="block text-md font-medium text-gray-700 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'buyer', label: 'Buyer' },
                  { value: 'supplier', label: 'Supplier' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: option.value })}
                    className={`py-4 px-4 rounded-lg text-sm font-medium border transition-colors
                      ${form.role === option.value
                        ? 'bg-[#1F53FF]/10 border-[#1F53FF] text-[#1F53FF]'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className='mb-4'>
              <label className="block text-md font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F53FF]/20 focus:border-[#1F53FF] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
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

            {/* Confirm Password */}
            <div className='mb-4'>
              <label className="block text-md font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F53FF]/20 focus:border-[#1F53FF] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
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

            {/* Terms and Conditions */}
            <div className="mb-4 mt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-[#1F53FF] focus:ring-[#1F53FF]/20 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#1F53FF] hover:text-[#1F53FF]/80 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#1F53FF] hover:text-[#1F53FF]/80 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-4 px-4 bg-[#162B60] hover:bg-[#162B64]/90 text-white font-semibold text-sm rounded-lg transition-colors mt-2 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-500 text-md">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Button */}
          <button className="w-full py-4 px-4 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 text-sm font-medium transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 text-md mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-[#1F53FF] hover:text-[#1F53FF]/80 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}