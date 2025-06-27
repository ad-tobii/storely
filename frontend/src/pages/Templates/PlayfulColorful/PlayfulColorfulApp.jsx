// src/pages/Templates/PlayfulColorful/PlayfulColorfulApp.jsx
"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import PlayfulColorfulHomePage from "./PlayfulColorfulHomePage"
import PlayfulColorfulShopPage from "./PlayfulColorfulShopPage"
import PlayfulColorfulProductDetailsPage from "./PlayfulColorfulProductDetailsPage"
import PlayfulColorfulAboutPage from "./PlayfulColorfulAboutPage"
import PlayfulColorfulContactPage from "./PlayfulColorfulContactPage"
import PlayfulColorfulCustomerOrdersPage from "./PlayfulColorfulCustomerOrdersPage"
import useCartStore from "../../../../store/useCartStore"
import { useAuthStore } from "../../../../store/useAuthStore"
import { axiosInstance } from "../../../../lib/axios"

const PlayfulColorfulApp = ({
  editMode = false,
  sellerId,
  storeSettings = {},
  seller = {}
}) => {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { getTotalItems } = useCartStore()
  const { isAuthenticated, user } = useAuthStore()
  const reactRouterNavigate = useNavigate();

  const defaultSettings = { themeColor: "#FF6B6B", secondaryColor: "#4ECDC4", backgroundColor: "#FFF9F9", primaryTextColor: "#292F36", secondaryTextColor: "#555555", products: [] }
  const mergedSettings = { ...defaultSettings, ...storeSettings, products: storeSettings?.products?.length > 0 ? storeSettings.products : defaultSettings.products }
  
  useEffect(() => {
    if (editMode) return;
    const track = async () => {
      try { await axiosInstance.post('/visits', { sellerId: seller._id, page: currentPage }); }
      catch (error) { console.warn('Visit tracking failed:', error.message); }
    };
    track();
  }, [currentPage, seller._id, editMode]);

  const navigate = (page, productId = null) => {
    if (page === "orders" && (!isAuthenticated || user?.role !== 'customer')) {
      reactRouterNavigate(`/login?redirect=${encodeURIComponent(window.location.href)}`);
      return;
    }
    setCurrentPage(page)
    window.scrollTo(0, 0)
    if (page === "product" && productId) {
      const product = mergedSettings.products.find(p => p._id === productId)
      setSelectedProduct(product)
    }
  }

  const renderPage = () => {
    const pageProps = { storeSettings: mergedSettings, seller, editMode, navigate, sellerId, product: selectedProduct }
    switch (currentPage) {
      case "home": return <PlayfulColorfulHomePage {...pageProps} />
      case "shop": return <PlayfulColorfulShopPage {...pageProps} />
      case "product": return <PlayfulColorfulProductDetailsPage {...pageProps} />
      case "about": return <PlayfulColorfulAboutPage {...pageProps} />
      case "contact": return <PlayfulColorfulContactPage {...pageProps} />
      case "orders": return <PlayfulColorfulCustomerOrdersPage {...pageProps} />
      default: return <PlayfulColorfulHomePage {...pageProps} />
    }
  }

  const navLinks = ["home", "shop", "about", "contact"];
  if (isAuthenticated && user?.role === 'customer') {
    navLinks.push("orders");
  }

  return (
    <div className="playful-colorful-app font-sans" style={{ color: mergedSettings.primaryTextColor, backgroundColor: mergedSettings.backgroundColor }}>
      <nav className="p-4 shadow-lg sticky top-0 z-50" style={{ background: `linear-gradient(135deg, ${mergedSettings.themeColor}, ${mergedSettings.secondaryColor})` }}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {seller.storeLogoUrl ? (
            <div className="cursor-pointer mb-4 md:mb-0" onClick={() => navigate("home")}>
              <img src={seller.storeLogoUrl} alt={`${seller.storename} logo`} className="h-10" />
            </div>
          ) : (
            <div className="text-2xl font-bold mb-4 md:mb-0 text-white cursor-pointer" onClick={() => navigate("home")}>
              {seller.storename || "🌈 Playful Colorful"}
            </div>
          )}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {navLinks.map(page => (
              <button key={page} onClick={() => navigate(page)} className={`px-4 py-2 rounded-full transition-all capitalize font-bold ${ currentPage === page ? "bg-white text-gray-800 shadow-lg scale-110" : "text-white hover:bg-white/20" }`}>
                {page}
              </button>
            ))}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-white/20 transition-colors">
                <ShoppingCart size={24} className="text-white" />
                {getTotalItems() > 0 && (<span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full" style={{ backgroundColor: mergedSettings.themeColor }}>{getTotalItems()}</span>)}
            </Link>
          </div>
        </div>
      </nav>
      <main>{renderPage()}</main>
      <footer className="p-8 mt-12" style={{ background: `linear-gradient(135deg, ${mergedSettings.secondaryColor}, ${mergedSettings.themeColor})` }}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div><h3 className="text-xl font-bold mb-4 text-white">{seller.storename || "🌈 Playful Colorful"}</h3><p className="text-white opacity-90">Bringing joy to your life!</p></div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-white opacity-90">
              {navLinks.map(page => (<li key={page}><button onClick={() => navigate(page)} className="hover:underline capitalize">{page}</button></li>))}
              <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            </ul>
          </div>
          <div><h3 className="text-xl font-bold mb-4 text-white">Contact</h3><address className="not-italic text-white opacity-90 space-y-2"><p>{seller.contactInfo?.address}</p><p>{seller.contactInfo?.email}</p><p>{seller.contactInfo?.phone}</p></address></div>
        </div>
        <div className="container mx-auto mt-8 pt-4 border-t border-white/20"><p className="text-center text-white opacity-90">© {new Date().getFullYear()} {seller.storename || "Playful Colorful"}. Made with 💖</p></div>
      </footer>
    </div>
  )
}

export default PlayfulColorfulApp