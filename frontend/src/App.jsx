import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Page Imports
import SellerSignup from './pages/seller/SellerSignup'
import SignupOptions from './pages/SignupOptions'
import LoginPage from './pages/components/LoginPage'
import Otp from './pages/components/Otp'
import SellerOnboarding from './pages/seller/SellerOnboarding'
import Editor from './pages/Templates/Editor'
import SellerDashboard from './pages/seller/SellerPage/seller-dashboard'
import CustomerSignup from './pages/customer/CustomerSignup'
import Storefront from './pages/Storefront'
import LandingPage from './pages/LandingPage'

// ✅ NEW: Import the ProtectedRoute and the global CartPage
import ProtectedRoute from './pages/components/ProtectedRoute'
import CartPage from './pages/CartPage'

/**
 * Main application component that defines all the routes for the site.
 * It uses a <ProtectedRoute> component to wrap routes that require
 * customer authentication, ensuring a robust, server-verified check
 * before rendering the page.
 */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public & Authentication Routes --- */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup-options" element={<SignupOptions />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customersignup" element={<CustomerSignup />} />
        <Route path="/sellersignup" element={<SellerSignup />} />
        <Route path="/otp" element={<Otp />} />

        {/* --- Seller-Specific Routes --- */}
        <Route path="/seller-onboarding" element={<SellerOnboarding />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />

        {/* --- Public Storefront Route --- */}
        {/* This route handles all dynamic storefronts, e.g., /store/my-cool-shop */}
        <Route path="/store/:storename" element={<Storefront />} />

        {/* --- Protected Customer Routes --- */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        {/* --- Fallback Route for 404 Not Found --- */}
        <Route
          path="*"
          element={
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
