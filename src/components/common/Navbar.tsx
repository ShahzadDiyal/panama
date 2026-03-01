import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import panameLogo from '../../assets/logo/panama.png'
import homeIcon from '../../assets/logo/home.png'
import suppliersIcon from '../../assets/logo/supplier.png'
import dealsIcon from '../../assets/logo/deals.png'
import servicesIcon from '../../assets/logo/services.png'
import sourcingIcon from '../../assets/logo/sourcing.png'
import pricingIcon from '../../assets/logo/pricing.png'


const navLinks = [
  {
    label: 'Home',
    path: '/',
    icon: (
      <img src={homeIcon} alt="" />
    ),
  },
  {
    label: 'Suppliers',
    path: '/supplier',
    icon: (
      <img src={suppliersIcon} alt="" />

    ),
  },
  {
    label: 'Deals',
    path: '/deals',
    icon: (
      <img src={dealsIcon} alt="" />

    ),
  },
  {
    label: 'Sourcing',
    path: '/sourcing',
    icon: (
      <img src={servicesIcon} alt="" />

    ),
  },
  {
    label: 'Servicing',
    path: '/servicing',
    icon: (
      <img src={sourcingIcon} alt="" />

    ),
  },
  {
    label: 'Pricing',
    path: '/pricing',
    icon: (
      <img src={pricingIcon} alt="" />

    ),
  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo — Left */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="lg:w-70 w-40 flex items-center justify-center  ">
              <img src={panameLogo} alt="" />
            </div>

          </Link>

          {/* Desktop Nav — Center */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[16px] font-medium transition-all duration-200
                  ${isActive
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/8'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Buttons — Right */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              to="/login"
              className="px-6 py-3 text-[16px] font-medium text-black bg-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 text-[16px] font-medium text-black bg-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
            >
              Get Access
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden
          ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-slate-950/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/login"
              className="block px-4 py-3 text-sm font-medium text-center bg-white text-black  rounded-lg transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-4 py-3 text-sm font-semibold text-center text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}