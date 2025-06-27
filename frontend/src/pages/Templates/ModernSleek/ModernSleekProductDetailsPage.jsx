// --- START OF FILE src/pages/Templates/ModernSleek/ModernSleekProductDetailsPage.jsx ---

"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Minus, Loader2 } from "lucide-react"
import useCartStore from "../../../../store/useCartStore"
import { useVisitTracker } from "../../hooks/useVisitTracker"
import { axiosInstance } from "../../../../lib/axios"
import ProductReviews from "../../../pages/seller/SellerPage/components/ProductReviews"


const ModernSleekProductDetailsPage = ({ storeSettings, product, navigate: templateNavigate, seller }) => {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCartStore()
  const reactRouterNavigate = useNavigate();

  useVisitTracker(seller?._id);

  useEffect(() => {
    const trackProductView = () => {
      if (product?._id && seller?._id) {
        axiosInstance.post('/tracking/product-view', {
          productId: product._id,
          sellerId: seller._id
        }).catch(err => console.error("Failed to track product view:", err));
      }
    };
    trackProductView();
  }, [product?._id, seller?._id]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // ✅ FIXED: Call the correct '/cart/check-access' route.
      await axiosInstance.get('/cart/check-access');
      addToCart(product, seller._id, quantity);
      alert(`${quantity} x ${product.name} added to cart.`);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        reactRouterNavigate(`/login?redirect=${encodeURIComponent(window.location.href)}`);
      } else {
        alert('An unexpected error occurred. Please try again.');
        console.error("Add to cart error:", error);
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">PRODUCT NOT FOUND</h1>
        <button onClick={() => templateNavigate("shop")} className="px-8 py-3 rounded-sm text-white" style={{ backgroundColor: storeSettings.themeColor }}>
          BACK TO COLLECTION
        </button>
      </div>
    )
  }

  return (
    <div className="modern-sleek-product-details py-20 px-4">
      <div className="container mx-auto">
        <div className="mb-12"><button onClick={() => templateNavigate("shop")} className="flex items-center gap-2 hover:underline" style={{ color: storeSettings.themeColor }}><ArrowLeft size={18} /> Back to Collection</button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-gray-800 p-4"><img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-auto object-cover" /></div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wide" style={{ color: storeSettings.primaryTextColor }}>{product.name}</h1>
            <p className="text-4xl font-bold mb-8" style={{ color: storeSettings.themeColor }}>${product.price?.toFixed(2)}</p>
            <div className="prose prose-lg mb-10 text-gray-300" style={{ color: storeSettings.secondaryTextColor }}><p>{product.description}</p></div>
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-gray-600">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-4 transition-colors hover:bg-gray-700"><Minus size={16} /></button>
                <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-4 transition-colors hover:bg-gray-700"><Plus size={16} /></button>
              </div>
              <button 
                onClick={handleAddToCart} 
                disabled={isAddingToCart}
                className="flex-1 py-4 px-8 font-semibold rounded-sm text-white transition-all duration-300 transform hover:scale-105 flex justify-center items-center disabled:opacity-70" style={{ backgroundColor: storeSettings.themeColor }}>
                {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin"/> : 'ADD TO CART'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-16 border-t border-gray-700/50">
            <ProductReviews productId={product._id} sellerId={seller._id} />
        </div>

      </div>
    </div>
  )
}

export default ModernSleekProductDetailsPage