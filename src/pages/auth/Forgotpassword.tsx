import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo/panama.png'
import bgImage from '../../assets/auth bg.png'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Reset password for:', email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#93AEFF] flex overflow-hidden " style={{
      backgroundImage: `linear-gradient(174deg, rgba(147, 174, 255, 0.5) 0%, rgba(255, 255, 255, 0.9) 80%))`,
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
        className="w-full lg:w-[35%] flex items-center justify-center p-8 bg-white shadow-xl relative z-10"
        style={{ borderTopLeftRadius: '40px' }}
      >
        <div className="w-full max-w-xl">
          {/* Mobile Logo (visible only on mobile) */}
          <div className="lg:hidden text-center mb-8">
            <img src={logo} alt="Panama Wholesale" className="w-48 mx-auto" />
          </div>

          {!submitted ? (
            <>
              {/* Back to Login Link */}
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm mb-6 transition-colors group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to login
              </Link>

              {/* Header with Icon */}
              <div className="mb-8">
                <div className="w-14 h-14 bg-[#1F53FF]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[#1F53FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h3>
                <p className="text-gray-400 font-semibold">
                  No worries, we'll send you reset instructions.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Email */}
                <div className='mb-8'>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F53FF]/20 focus:border-[#1F53FF] transition-colors"
                  />
                </div>

                {/* Reset Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-4 bg-[#162B60] hover:bg-[#162B64]/90 text-white font-semibold text-sm rounded-lg transition-colors mt-2 cursor-pointer"
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600 text-md mb-6">
                We sent a reset link to<br />
                <span className="text-gray-900 font-medium">{email}</span>
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-[#1F53FF] hover:text-[#1F53FF]/80 font-medium text-md transition-colors"
              >
                Back to login
              </Link>
            </div>
          )}

          {/* Sign In Link (for non-success state) */}
          {!submitted && (
            <p className="text-center text-gray-600 text-md mt-8">
              Remember your password?{' '}
              <Link to="/login" className="text-[#1F53FF] hover:text-[#1F53FF]/80 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}