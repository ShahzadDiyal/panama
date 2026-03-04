import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { NavbarProvider } from './context/NavbarContext'

export default function App() {
  return (
    <BrowserRouter>
      <NavbarProvider>
        <AppRoutes />
      </NavbarProvider>
    </BrowserRouter>
  )
}