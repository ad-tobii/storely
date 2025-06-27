// src/pages/Templates/ModernSleek/ModernSleekApp.jsx
"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import ModernSleekHomePage from "./ModernSleekHomePage"
import ModernSleekShopPage from "./ModernSleekShopPage"
import ModernSleekProductDetailsPage from "./ModernSleekProductDetailsPage"
import ModernSleekAboutPage from "./ModernSleekAboutPage"
import ModernSleekContactPage from "./ModernSleekContactPage"
import ModernSleekCustomerOrdersPage from "./ModernSleekCustomerOrdersPage"
import useCartStore from "../../../../store/useCartStore"
import { useAuthStore } from "../../../../store/useAuthStore"
import { axiosInstance } from "../../../../lib/axios"

const ModernSleekApp = ({
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

  const defaultSettings = { themeColor: "#3B82F6", secondaryColor: "#1F2937", backgroundColor: "#111827", primaryTextColor: "#F9FAFB", secondaryTextColor: "#9CA3AF", products: [] }
  const mergedSettings = { ...defaultSettings, ...storeSettings, products: storeSettings?.products?.length ? storeSettings.products : defaultSettings.products }

  useEffect(() => {
    document.body.style.backgroundColor = mergedSettings.backgroundColor;
    return () => { document.body.style.backgroundColor = ''; }
  }, [mergedSettings.backgroundColor]);

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
      case "home": return <ModernSleekHomePage {...pageProps} />
      case "shop": return <ModernSleekShopPage {...pageProps} />
      case "product": return <ModernSleekProductDetailsPage {...pageProps} />
      case "about": return <ModernSleekAboutPage {...pageProps} />
      case "contact": return <ModernSleekContactPage {...pageProps} />
      case "orders": return <ModernSleekCustomerOrdersPage {...pageProps} />
      default: return <ModernSleekHomePage {...pageProps} />
    }
  }

  const navLinks = ["home", "shop", "about", "contact"];
  if (isAuthenticated && user?.role === 'customer') {
    navLinks.push("orders");
  }

  return (
    <div className="modern-sleek-app font-sans" style={{ color: mergedSettings.primaryTextColor, backgroundColor: mergedSettings.backgroundColor }}>
      <nav className="p-6 border-b border-gray-700/50" style={{ backgroundColor: mergedSettings.secondaryColor }}>
        <div className="container mx-auto flex justify-between items-center">
          {seller.storeLogoUrl ? (
            <div className="cursor-pointer" onClick={() => navigate("home")}>
              <img src={seller.storeLogoUrl} alt={`${seller.storename} logo`} className="h-8" />
            </div>
          ) : (
            <div className="text-2xl font-bold tracking-wider cursor-pointer" onClick={() => navigate("home")} style={{ color: mergedSettings.primaryTextColor }}>
              {seller.storename || "MODERN"}
            </div>
          )}
          <div className="flex items-center gap-8">
            {navLinks.map((page) => (
              <button key={page} onClick={() => navigate(page)} className="capitalize text-lg font-medium transition-colors relative" style={{ color: currentPage === page ? mergedSettings.themeColor : mergedSettings.secondaryTextColor }}>
                {page}
                {currentPage === page && (<span className="absolute -bottom-2 left-0 w-full h-0.5" style={{backgroundColor: mergedSettings.themeColor}}></span>)}
              </button>
            ))}
             <Link to="/cart" className="relative p-2" style={{ color: mergedSettings.primaryTextColor }}>
                <ShoppingCart size={22} />
                {getTotalItems() > 0 && (<span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white rounded-full" style={{ backgroundColor: mergedSettings.themeColor }}>{getTotalItems()}</span>)}
            </Link>
          </div>
        </div>
      </nav>
      <main>{renderPage()}</main>
      <footer className="p-10 mt-16 border-t border-gray-700/50" style={{ backgroundColor: mergedSettings.secondaryColor }}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2"><h3 className="text-xl font-bold mb-4" style={{ color: mergedSettings.primaryTextColor }}>{seller.storename || "MODERN"}</h3><p style={{ color: mergedSettings.secondaryTextColor }}>Curated design for the modern individual.</p></div>
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: mergedSettings.primaryTextColor }}>Navigate</h3>
            <ul className="space-y-2" style={{ color: mergedSettings.secondaryTextColor }}>
              {navLinks.map((page) => (<li key={page}><button onClick={() => navigate(page)} className="hover:text-white capitalize">{page}</button></li>))}
               <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            </ul>
          </div>
          <div><h3 className="text-lg font-semibold mb-4" style={{ color: mergedSettings.primaryTextColor }}>Contact</h3><address className="not-italic space-y-2" style={{ color: mergedSettings.secondaryTextColor }}><p>{seller.contactInfo?.address}</p><p>{seller.contactInfo?.email}</p><p>{seller.contactInfo?.phone}</p></address></div>
        </div>
        <div className="container mx-auto mt-8 pt-6 border-t border-gray-700/50"><p className="text-center" style={{ color: mergedSettings.secondaryTextColor }}>© {new Date().getFullYear()} {seller.storename || "MODERN"}. All Rights Reserved.</p></div>
      </footer>
    </div>
  )
}

export default ModernSleekApp