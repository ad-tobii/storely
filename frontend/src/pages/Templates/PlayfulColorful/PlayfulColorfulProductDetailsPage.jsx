// --- START OF FILE src/pages/Templates/PlayfulColorful/PlayfulColorfulProductDetailsPage.jsx ---

"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Minus, ShoppingCart, Loader2 } from "lucide-react"
import useCartStore from "../../../../store/useCartStore"
import { useVisitTracker } from "../../hooks/useVisitTracker"
import { axiosInstance } from "../../../../lib/axios"
import ProductReviews from "../../../pages/seller/SellerPage/components/ProductReviews"

const PlayfulColorfulProductDetailsPage = ({
  storeSettings,
  product,
  navigate: templateNavigate,
  seller
}) => {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCartStore();
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
      await axiosInstance.get('/cart/check-access');
      addToCart(product, seller._id, quantity);
      alert(`Yay! ${quantity} x ${product.name} added to your cart! 🎉`);
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
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-8">😭 Oops! Product Not Found 😭</h1>
        <button onClick={() => templateNavigate("shop")} className="px-8 py-4 rounded-full text-white font-bold text-lg" style={{ background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})` }}>
          BACK TO SHOP
        </button>
      </div>
    )
  }

  return (
    <div className="playful-colorful-product-details py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-12"><button onClick={() => templateNavigate("shop")} className="flex items-center gap-2 font-bold hover:underline" style={{ color: storeSettings.themeColor }}><ArrowLeft size={20} /> Back to Shop</button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="p-4 rounded-2xl shadow-xl" style={{ backgroundColor: storeSettings.secondaryColor + "20" }}><img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-auto object-cover rounded-xl transform rotate-1" /></div>
          <div>
            <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
            <p className="text-4xl font-bold mb-8" style={{ color: storeSettings.themeColor }}>${product.price?.toFixed(2)}</p>
            <div className="prose text-lg leading-relaxed mb-8" style={{ color: storeSettings.secondaryTextColor }}><p>{product.description}</p></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border-2 border-zinc-300 rounded-full">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-4"><Minus size={16} /></button>
                <span className="w-16 text-center font-bold text-xl">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-4"><Plus size={16} /></button>
              </div>
              <button 
                onClick={handleAddToCart} 
                disabled={isAddingToCart}
                className="flex-1 px-8 py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 disabled:opacity-70" style={{ background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})` }}>
                {isAddingToCart ? <Loader2 className="w-6 h-6 animate-spin"/> : <><ShoppingCart size={20} /> Add to Cart</>}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-16 border-t-4 border-dashed" style={{borderColor: storeSettings.themeColor + '30'}}>
            <ProductReviews productId={product._id} sellerId={seller._id} />
        </div>
      </div>
    </div>
  )
}

export default PlayfulColorfulProductDetailsPage