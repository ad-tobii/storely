// src/pages/Templates/BoldMinimalist/BoldMinimalistApp.jsx
"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import BoldMinimalistHomePage from "./BoldMinimalistHomepage"
import BoldMinimalistShopPage from "./BoldMinimalistShopPage"
import BoldMinimalistProductDetailsPage from "./BoldMinimalistProductDetailsPage"
import BoldMinimalistAboutPage from "./BoldMinimalistAboutPage"
import BoldMinimalistContactPage from "./BoldMinimalistContactPage"
import BoldMinimalistCustomerOrdersPage from "./BoldMinimalistCustomerOrdersPage"
import useCartStore from "../../../../store/useCartStore"
import { useAuthStore } from "../../../../store/useAuthStore"
import { axiosInstance } from "../../../../lib/axios"

const BoldMinimalistApp = ({
  editMode = false,
  sellerId,
  storeSettings = {},
  seller = {},
}) => {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { getTotalItems } = useCartStore()
  const { isAuthenticated, user } = useAuthStore()
  const reactRouterNavigate = useNavigate();

  const defaultSettings = {
    themeColor: "#000000",
    backgroundColor: "#F8F8F8",
    primaryTextColor: "#000000",
    secondaryTextColor: "#555555",
    products: [],
  }

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
      const product = mergedSettings.products.find((p) => p._id === productId)
      setSelectedProduct(product)
    }
  }

  const renderPage = () => {
    const pageProps = {
      storeSettings: mergedSettings,
      seller,
      editMode,
      navigate,
      sellerId,
      product: selectedProduct,
    }
    switch (currentPage) {
      case "home": return <BoldMinimalistHomePage {...pageProps} />
      case "shop": return <BoldMinimalistShopPage {...pageProps} />
      case "product": return <BoldMinimalistProductDetailsPage {...pageProps} />
      case "about": return <BoldMinimalistAboutPage {...pageProps} />
      case "contact": return <BoldMinimalistContactPage {...pageProps} />
      case "orders": return <BoldMinimalistCustomerOrdersPage {...pageProps} />
      default: return <BoldMinimalistHomePage {...pageProps} />
    }
  }

  const navLinks = ["home", "shop", "about", "contact"];
  if (isAuthenticated && user?.role === 'customer') {
    navLinks.push("orders");
  }

  return (
    <div className="bold-minimalist-app font-mono" style={{ color: mergedSettings.primaryTextColor, backgroundColor: mergedSettings.backgroundColor }}>
      <nav className="p-8 border-b-4 border-black">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {seller.storeLogoUrl ? (
            <div className="cursor-pointer mb-4 md:mb-0" onClick={() => navigate("home")}>
              <img src={seller.storeLogoUrl} alt={`${seller.storename} logo`} className="h-8" />
            </div>
          ) : (
            <div className="text-3xl font-black mb-4 md:mb-0 cursor-pointer uppercase tracking-widest" onClick={() => navigate("home")} style={{ color: mergedSettings.primaryTextColor }}>
              {seller.storename || "BOLD"}
            </div>
          )}
          <div className="flex items-center gap-12">
            {navLinks.map((page) => (
              <button key={page} onClick={() => navigate(page)} className={`text-lg font-bold uppercase tracking-widest transition-all duration-200 ${ currentPage === page ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black" }`}>
                {page}
              </button>
            ))}
             <Link to="/cart" className="relative p-2" style={{ color: mergedSettings.primaryTextColor }}>
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (<span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full font-black">{getTotalItems()}</span>)}
            </Link>
          </div>
        </div>
      </nav>
      <main>{renderPage()}</main>
      <footer className="p-12 border-t-4 border-black" style={{ backgroundColor: mergedSettings.themeColor }}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div><h3 className="text-2xl font-black mb-4 text-white uppercase tracking-widest">{seller.storename || "BOLD"}</h3><p className="text-white font-bold uppercase tracking-wider">UNCOMPROMISING DESIGN.</p></div>
          <div>
            <h3 className="text-xl font-black mb-4 text-white">NAVIGATION</h3>
            <ul className="space-y-2 text-white font-bold uppercase tracking-wider">
              {navLinks.map((page) => (<li key={page}><button onClick={() => navigate(page)} className="hover:underline">{page}</button></li>))}
               <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-black mb-4 text-white">CONTACT</h3>
            <address className="not-italic text-white font-bold uppercase tracking-wider"><p>{seller.contactInfo?.address}</p><p>{seller.contactInfo?.email}</p><p>{seller.contactInfo?.phone}</p></address>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t-2 border-white"><p className="text-center text-white font-bold uppercase tracking-widest">© {new Date().getFullYear()} {seller.storename || "BOLD"}. ALL RIGHTS RESERVED.</p></div>
      </footer>
    </div>
  )
}

export default BoldMinimalistApp