import { Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from '../layout/MainLayout'
import AuthLayout from '../layout/AuthLayout'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/Forgotpassword'

// Main Pages
import Home from '../pages/home/Home'
import Supplier from '../pages/supplier/Supplier'
import SupplierDetails from '../pages/supplier/Supplierdetails'
import Deals from '../pages/deals/Deals'
import DealDetails from '../pages/deals/DealsDetails'
import Sourcing from '../pages/sourcing/Sourcing'
import Servicing from '../pages/servicing/Servicing'
import Pricing from '../pages/pricing/Pricing'
import Quotes from '../pages/quotes/Quotes'
import QuoteDetails from '../pages/quotes/QuoteDetails'

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
            </Route>

            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />}/> 
                <Route path="/supplier" element={<Supplier />}/> 
                <Route path="/supplier/:id" element={<SupplierDetails />}/> 
                <Route path="/deals" element={<Deals />}/> 
                <Route path="/deals/:id" element={<DealDetails />}/> 
                <Route path="/sourcing" element={<Sourcing />}/> 
                <Route path="/servicing" element={<Servicing />}/> 
                <Route path="/pricing" element={<Pricing />}/> 
                  <Route path="/quotes" element={<Quotes />} />
  <Route path="/quotes/:id" element={<QuoteDetails />} />
            </Route>
        </Routes>
    )
}