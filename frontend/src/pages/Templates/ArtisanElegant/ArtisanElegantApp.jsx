"use client"
import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { Link, useNavigate } from "react-router-dom" 
import ArtisanElegantHomePage from "./ArtisanElegantHomePage"
import ArtisanElegantShopPage from "./ArtisanElegantShopPage"
import ArtisanElegantProductDetailsPage from "./ArtisanElegantProductDetailsPage"
import ArtisanElegantAboutPage from "./ArtisanElegantAboutpage"
import ArtisanElegantContactPage from "./ArtisanElegantContactPage"
import ArtisanElegantCustomerOrdersPage from "./ArtisanElegantCustomerOrdersPage"
import useCartStore from "../../../../store/useCartStore"
import { useAuthStore } from "../../../../store/useAuthStore"
import { axiosInstance } from "../../../../lib/axios"

const ArtisanElegantApp = ({ editMode = false, storeSettings = {}, seller = {}, sellerId }) => {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { getTotalItems } = useCartStore()
  const { isAuthenticated, user } = useAuthStore()
  const reactRouterNavigate = useNavigate();

  const defaultSettings = { themeColor: "#8B5A2B", secondaryColor: "#D2B48C", backgroundColor: "#FAF7F2", primaryTextColor: "#333333", secondaryTextColor: "#666666", products: [] }
  const mergedSettings = { ...defaultSettings, ...storeSettings, products: storeSettings?.products?.length ? storeSettings.products : defaultSettings.products }

  useEffect(() => {
    if (editMode) return;
    const track = async () => {
      try { await axiosInstance.post('/visits', { sellerId: seller._id, page: currentPage }); }
      catch (error) { console.warn('Visit tracking failed:', error.message) }
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
    const pageProps = { storeSettings: mergedSettings, seller, editMode, navigate, sellerId, product: selectedProduct }
    switch (currentPage) {
      case "home": return <ArtisanElegantHomePage {...pageProps} />
      case "shop": return <ArtisanElegantShopPage {...pageProps} />
      case "product": return <ArtisanElegantProductDetailsPage {...pageProps} />
      case "about": return <ArtisanElegantAboutPage {...pageProps} />
      case "contact": return <ArtisanElegantContactPage {...pageProps} />
      case "orders": return <ArtisanElegantCustomerOrdersPage {...pageProps} />
      default: return <ArtisanElegantHomePage {...pageProps} />
    }
  }
  
  const navLinks = ["home", "shop", "about", "contact"];
  if (isAuthenticated && user?.role === 'customer') {
    navLinks.push("orders");
  }

  return (
    <div className="artisan-elegant-app font-serif" style={{ color: mergedSettings.primaryTextColor, backgroundColor: mergedSettings.backgroundColor }}>
      <nav className="p-4 shadow-sm" style={{ backgroundColor: mergedSettings.secondaryColor }}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {seller.storeLogoUrl ? (
            <div className="cursor-pointer mb-4 md:mb-0" onClick={() => navigate("home")}>
              <img src={seller.storeLogoUrl} alt={`${seller.storename} logo`} className="h-10" />
            </div>
          ) : (
            <div className="text-2xl font-bold mb-4 md:mb-0 cursor-pointer" onClick={() => navigate("home")} style={{ color: mergedSettings.primaryTextColor }}>
              {seller.storename || "Artisan Elegant"}
            </div>
          )}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {navLinks.map((page) => (
              <button key={page} onClick={() => navigate(page)} className="px-3 py-1 rounded transition-colors capitalize" style={{ color: currentPage === page ? mergedSettings.themeColor : mergedSettings.primaryTextColor, fontWeight: currentPage === page ? 'bold' : 'normal' }}>
                {page}
              </button>
            ))}
             <Link to="/cart" className="relative p-2 rounded-full hover:bg-black/10 transition-colors" style={{ color: mergedSettings.primaryTextColor }}>
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (<span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white rounded-full" style={{ backgroundColor: mergedSettings.themeColor }}>{getTotalItems()}</span>)}
            </Link>
          </div>
        </div>
      </nav>
      <main>{renderPage()}</main>
      <footer className="p-8 mt-12" style={{ backgroundColor: mergedSettings.secondaryColor }}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div><h3 className="text-xl font-bold mb-4" style={{ color: mergedSettings.primaryTextColor }}>{seller.storename || "Artisan Elegant"}</h3><p style={{ color: mergedSettings.secondaryTextColor }}>Handcrafted goods made with love and attention to detail.</p></div>
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: mergedSettings.primaryTextColor }}>Quick Links</h3>
            <ul className="space-y-2" style={{ color: mergedSettings.secondaryTextColor }}>
              {navLinks.map((page) => (<li key={page}><button onClick={() => navigate(page)} className="hover:underline capitalize">{page}</button></li>))}
               <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            </ul>
          </div>
          <div><h3 className="text-xl font-bold mb-4" style={{ color: mergedSettings.primaryTextColor }}>Contact</h3><address className="not-italic" style={{ color: mergedSettings.secondaryTextColor }}><p>{seller.contactInfo?.address}</p><p>{seller.contactInfo?.email}</p><p>{seller.contactInfo?.phone}</p></address></div>
        </div>
        <div className="container mx-auto mt-8 pt-4 border-t border-opacity-20" style={{ borderColor: mergedSettings.primaryTextColor }}><p className="text-center" style={{ color: mergedSettings.secondaryTextColor }}>© {new Date().getFullYear()} {seller.storename || "Artisan Elegant"}. All rights reserved.</p></div>
      </footer>
    </div>
  )
}

export default ArtisanElegantApp