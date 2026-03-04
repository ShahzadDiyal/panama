import { Outlet } from 'react-router-dom'
import Navbar1 from '../components/common/Navbar-1'
import Navbar2 from '../components/common/Navbar-2'
import Footer from '../components/common/Footer'
import { useNavbar } from '../context/NavbarContext'

export default function MainLayout() {
  const { showNavbar2 } = useNavbar();

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar2 ? <Navbar2 /> : <Navbar1 />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}