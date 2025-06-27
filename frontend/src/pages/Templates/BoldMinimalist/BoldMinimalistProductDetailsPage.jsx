// --- START OF FILE src/pages/Templates/BoldMinimalist/BoldMinimalistProductDetailsPage.jsx ---
"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Minus, Loader2 } from "lucide-react"
import useCartStore from "../../../../store/useCartStore"
import { useVisitTracker } from "../../hooks/useVisitTracker"
import { axiosInstance } from "../../../../lib/axios"
import ProductReviews from "../../../pages/seller/SellerPage/components/ProductReviews"


const BoldMinimalistProductDetailsPage = ({ storeSettings, product, navigate: templateNavigate, seller }) => {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCartStore()
  const reactRouterNavigate = useNavigate()

  useVisitTracker(seller?._id)

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
      alert(`${quantity} X ${product.name} ADDED TO CART.`);
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
      <div className="container mx-auto py-16 px-8 text-center">
        <h1 className="text-4xl font-black mb-8 uppercase tracking-widest">PRODUCT NOT FOUND</h1>
        <button onClick={() => templateNavigate("shop")} className="px-12 py-6 font-black text-xl uppercase tracking-widest transition-all duration-300 border-4 hover:opacity-80" style={{
            backgroundColor: storeSettings.themeColor,
            color: storeSettings.backgroundColor,
            borderColor: storeSettings.themeColor,
        }}>
          VIEW COLLECTION
        </button>
      </div>
    )
  }

  return (
    <div className="bold-minimalist-product-details py-16 px-8">
      <div className="container mx-auto">
        <div className="mb-16">
          <button onClick={() => templateNavigate("shop")} className="flex items-center gap-2 font-bold uppercase tracking-widest hover:underline">
            <ArrowLeft size={20} /> VIEW COLLECTION
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
          <div className="p-8 border-b-4 md:border-b-0 md:border-r-4 border-black">
            <img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-auto object-cover" />
          </div>
          <div className="p-8 bg-black text-white">
            <h1 className="text-5xl font-black mb-6 uppercase tracking-widest">{product.name}</h1>
            <p className="text-6xl font-black mb-12">${product.price?.toFixed(2)}</p>
            <div className="prose font-bold text-lg leading-relaxed mb-12 text-gray-300">
              <p>{product.description}</p>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border-4 border-white">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-4 transition-colors hover:bg-gray-800">
                  -
                </button>
                <span className="w-16 text-center font-black text-2xl">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-4 transition-colors hover:bg-gray-800">
                  +
                </button>
              </div>
            </div>
            <button 
              onClick={handleAddToCart} 
              disabled={isAddingToCart}
              className="w-full px-8 py-6 bg-white text-black font-black text-xl uppercase tracking-widest transition-all duration-300 hover:bg-gray-300 border-4 border-white flex justify-center items-center disabled:opacity-70"
            >
              {isAddingToCart ? <Loader2 className="w-6 h-6 animate-spin" /> : 'ADD TO CART'}
            </button>
          </div>
        </div>
        
        <div className="mt-16 pt-16 border-t-4 border-black">
            <ProductReviews productId={product._id} sellerId={seller._id} />
        </div>

      </div>
    </div>
  )
}

export default BoldMinimalistProductDetailsPage