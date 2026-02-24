import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top bar with logo */}
      <div className="p-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-slate-900 font-bold text-sm">P</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">Paname</span>
        </Link>
      </div>

      {/* Auth content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Outlet />
      </div>
    </div>
  )
}