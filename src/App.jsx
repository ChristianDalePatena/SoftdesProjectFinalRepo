import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom"
import { FiHome, FiShoppingBag, FiList, FiUser, FiLogIn } from "react-icons/fi" // Added Navigation Icons
import ScrollToTop from "./ScrollToTop"

// Import your pages
import Home from "./pages/Home" 
import Shop from "./pages/Shop" 
import Orders from "./pages/Orders" // <-- IMPORTED THE NEW ORDERS PAGE
import SignIn from "./pages/signin"
import AccountLogin from "./pages/AccountLogin"
import ProductPage from "./pages/productPages/ProductPage"
import AdminDashboard from "./pages/AdminDashboard"

function Footer() {
  return (
    <footer className="w-full bg-gray-800 border-t border-gray-900 mt-auto pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="flex flex-col space-y-4">
            <h3 className="font-black text-white uppercase tracking-widest text-sm mb-2">About us</h3>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Why Choose Us</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Who We Are</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Terms of Services</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Privacy Policy</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-black text-white uppercase tracking-widest text-sm mb-2">Getting Started</h3>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">How to Order Online</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Earn Points</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Paper Guide</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Delivery and Turnaround</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">All Products</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-black text-white uppercase tracking-widest text-sm mb-2">Help & Support</h3>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">FAQ</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Ways to Pay</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Download Templates</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold">Yearly Calendar</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-black text-white uppercase tracking-widest text-sm mb-2">Connect</h3>
            <a href="https://www.facebook.com/p2printing" target="_blank" rel="noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold flex items-center gap-3">
              <img src="/icons/fb.ico" alt="facebook icon" className="w-5 h-5" /> Facebook
            </a>
            <a href="https://www.instagram.com/pick2printph/" target="_blank" rel="noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold flex items-center gap-3">
              <img src="/icons/ig.ico" alt="instagram icon" className="w-5 h-5" /> Instagram
            </a>
            <a href="mailto:picktwoprint@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold flex items-center gap-3">
              <img src="/icons/gmail.ico" alt="gmail icon" className="w-4 h-auto" /> picktwoprint@gmail.com
            </a>
            <a href="tel:09474631561" className="text-gray-400 text-sm hover:text-white transition-colors font-semibold flex items-center gap-3">
              <img src="/icons/tel.ico" alt="telephone icon" className="w-4 h-auto" /> 0947-463-1561
            </a>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-black text-white uppercase tracking-widest text-sm mb-2">We Accept</h3>
            <div className="grid grid-cols-3 gap-3 bg-white p-3.5 rounded-xl shadow-md items-center justify-items-center">
              <img src="https://www.metroprint.ph/img/footer/gcash.png" alt="gcash" className="h-5 object-contain" />
              <img src="https://www.metroprint.ph/img/footer/maya.png" alt="maya" className="h-4 object-contain" />
              <img src="https://www.metroprint.ph/img/footer/bpi.png" alt="bpi" className="h-5 object-contain" />
              <img src="https://www.metroprint.ph/img/footer/coinsph.png" alt="coinsph" className="h-5 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="paypal" className="h-5 object-contain" />
              <img src="https://edge.pse.com.ph/clogo/634/cl52f89319r675.jpg" alt="eastwest" className="h-5 object-contain" />
            </div>
            <a href="#" className="text-gray-400 text-xs hover:text-white transition-colors font-semibold mt-2 underline">Bank Transfer / Cheques</a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-gray-400">
          <p>© {new Date().getFullYear()} Pick2Print. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState("page-enter")

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("page-exit")
    }
  }, [location, displayLocation])

  const handleAnimationEnd = () => {
    if (transitionStage === "page-exit") {
      setDisplayLocation(location)
      setTransitionStage("page-enter")
    }
  }

  return (
    <div
      className={`flex-1 ${transitionStage}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} /> 
        <Route path="/shop" element={<Shop />} />
        
        {/* ADDED THE ORDERS ROUTE HERE TO FIX THE WHITE SCREEN */}
        <Route path="/orders" element={<Orders />} /> 
        
        <Route path="/product/:name" element={<ProductPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/account" element={<AccountLogin />} />
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="font-sans font-light min-h-screen bg-gray-50 flex flex-col">
        <AnimatedRoutes />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans font-light">
      
      {/* HEADER - Increased from h-32 to h-40 for a bigger "Hero" feel */}
      <div className="h-40 py-6 sticky top-0 z-50 border-b-8 border-red-600 bg-white">
        <div className="flex h-full items-center mx-10">
          <Link to="/" onClick={() => { window.__scrollToTop = true }}>
            {/* LOGO - Increased from h-20 to h-28 */}
            <img src="/images/Logo.png" alt="Pick2Print Logo" className="w-auto h-28 transition-all duration-300" />
          </Link>
        </div>
      </div>

      {/* NAV BAR - Updated top offset to 160px to match the new h-40 header */}
      <div className="flex justify-between items-center bg-gray-800 text-white shadow-lg sticky top-[160px] z-40 px-10 py-5">
        <ul className="flex space-x-12 font-black text-sm uppercase tracking-widest items-center">
          <li>
            <Link to="/" className="flex items-center gap-2 hover:text-red-400 transition-colors py-1">
              <FiHome className="text-lg" /> Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="flex items-center gap-2 hover:text-red-400 transition-colors py-1">
              <FiShoppingBag className="text-lg" /> Shop
            </Link>
          </li>
          <li>
            <Link to="/orders" className="flex items-center gap-2 hover:text-red-400 transition-colors py-1">
              <FiList className="text-lg" /> Orders
            </Link>
          </li>
        </ul>

        <div className="flex gap-10 items-center">
          <Link to="/account" className="flex flex-row items-center gap-2 text-gray-300 border-b-2 border-transparent hover:border-red-500 hover:text-white transition-all group py-1">
            <FiUser className="text-lg opacity-70 group-hover:opacity-100 transition" />
            <p className="font-black text-xs uppercase tracking-widest">Account</p>
          </Link>
          
          <Link to="/signin" className="flex flex-row items-center gap-2 text-gray-300 border-b-2 border-transparent hover:border-red-500 hover:text-white transition-all group py-1">
            <FiLogIn className="text-lg opacity-70 group-hover:opacity-100 transition" />
            <p className="font-black text-xs uppercase tracking-widest">Log-in/Sign-in</p>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <AnimatedRoutes />
      </div>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}

export default App