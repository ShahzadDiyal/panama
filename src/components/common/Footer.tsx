import { Link } from 'react-router-dom'

const col1Links = [
  { label: 'Suppliers', path: '/supplier' },
  { label: 'Deals', path: '/deals' },
  { label: 'Contact', path: '/contact' },
]

const col2Links = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/servicing' },
  { label: 'Pricing', path: '/pricing' },
]

export default function Footer() {
  return (
    <footer
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #D3F8FF 100%)' }}
      className="border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Desktop layout: everything in one flex row, bottom-aligned ── */}
        <div className="hidden sm:flex items-end gap-0 min-h-[160px] py-16">

          {/* Brand */}
          <div className="flex-1 flex items-end ">
            <Link to="/">
              <span
                className="font-extrabold leading-none select-none"
                style={{ fontSize: 'clamp(60px, 9vw, 110px)', color: '#CFCFCF' }}
              >
                Panama
              </span>
            </Link>
          </div>

          {/* Link columns */}
          <div className="flex items-end gap-20 lg:gap-44 pb-1 pt-2">

            {/* Col 1 */}
            <ul className="space-y-6">
              {col1Links.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} >
                    <span className="text-[#33333399] text-[16px] font-semibold hover:text-sky-500 transition-colors duration-200">  {link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Col 2 */}
            <ul className="space-y-6">
              {col2Links.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} >
                    <span className="text-[#33333399] text-[16px] font-semibold hover:text-sky-500 transition-colors duration-200">  {link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Terms — bottom of its column */}
            <div className="flex items-end">
              <Link
                to="/terms"
                className="text-sky-500 text-[16px] font-medium hover:text-sky-400 transition-colors duration-200 whitespace-nowrap"
              >
                Terms &amp; Privacy
              </Link>
            </div>

          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="sm:hidden py-8 space-y-8">

          {/* Brand */}
          <Link to="/">
            <span
              className="font-extrabold leading-none select-none block lg:pb-0 xl:pb-0 pb-4"
              style={{ fontSize: '64px', color: '#CFCFCF' }}
            >
              Panama
            </span>
          </Link>

          {/* Link grid */}
          <div className="grid grid-cols-2 gap-6">
            <ul className="space-y-3">
              {col1Links.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} >
                    <span className="text-slate-500 text-[16px] font-bold hover:text-sky-500 transition-colors duration-200">  {link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {col2Links.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} >
                    <span className="text-slate-500 text-[16px] font-bold hover:text-sky-500 transition-colors duration-200">  {link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms */}
          <Link to="/terms" className="text-sky-500 text-sm font-medium hover:text-sky-400 transition-colors duration-200 block">
            Terms &amp; Privacy
          </Link>

        </div>

      </div>
    </footer>
  )
}