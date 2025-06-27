// src/pages/Templates/ArtisanElegant/ArtisanElegantProductDetailsPage.jsx
"use client"
import { useState, useEffect } from "react"
import { ArrowLeft, Plus, Minus, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useCartStore from "../../../../store/useCartStore"
import { useVisitTracker } from "../../hooks/useVisitTracker"
import { axiosInstance } from "../../../../lib/axios"
import ProductReviews from "../../seller/SellerPage/components/ProductReviews" 

const ArtisanElegantProductDetailsPage = ({ storeSettings, product, navigate: templateNavigate, seller }) => {
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "/placeholder.svg")
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCartStore()
  const reactRouterNavigate = useNavigate()

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

  useEffect(() => { setMainImage(product?.images?.[0] || "/placeholder.svg") }, [product])

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // ✅ FIXED: Call the correct '/cart/check-access' route.
      await axiosInstance.get('/cart/check-access');
      
      addToCart(product, seller._id, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);

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
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Oops! Product Not Found</h1>
        <p className="text-lg mb-6">The product you are looking for does not exist or has been moved.</p>
        <button onClick={() => templateNavigate("shop")} className="px-6 py-2 rounded-md text-white" style={{ backgroundColor: storeSettings.themeColor }}>
          Back to Shop
        </button>
      </div>
    )
  }

  return (
    <div className="artisan-elegant-product-details py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8"><button onClick={() => templateNavigate("shop")} className="flex items-center gap-2 hover:underline" style={{ color: storeSettings.themeColor }}><ArrowLeft size={16} /> Back to Shop</button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-4"><img src={mainImage} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" /></div>
            <div className="flex gap-2">
              {(product.images || []).map((img, i) => (<img key={i} src={img} alt={`${product.name} thumbnail ${i + 1}`} onClick={() => setMainImage(img)} className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${ mainImage === img ? "border-theme-color" : "border-transparent hover:border-gray-300" }`} style={{ "--border-theme-color": storeSettings.themeColor }} />))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: storeSettings.primaryTextColor }}>{product.name}</h1>
            <p className="text-2xl font-medium mb-6" style={{ color: storeSettings.themeColor }}>${product.price?.toFixed(2)}</p>
            <div className="prose mb-8" style={{ color: storeSettings.secondaryTextColor }}><p>{product.description}</p></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-md" style={{ borderColor: storeSettings.secondaryColor }}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3"><Minus size={16} /></button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="p-3"><Plus size={16} /></button>
              </div>
              <button 
                onClick={handleAddToCart} 
                disabled={isAddingToCart}
                className="flex-1 py-3 px-6 rounded-md text-white font-medium transition-transform duration-300 transform hover:scale-105 flex justify-center items-center disabled:opacity-70" style={{ backgroundColor: storeSettings.themeColor }}>
                {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
        
        <ProductReviews productId={product._id} sellerId={seller._id} />
        
        <div className="mt-20 pt-10 border-t" style={{ borderColor: storeSettings.secondaryColor + "40" }}>
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: storeSettings.primaryTextColor }}>You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(storeSettings.products || []).filter((p) => p._id !== product._id).slice(0, 4).map((relatedProduct) => (
                <div key={relatedProduct._id} className="group cursor-pointer" onClick={() => templateNavigate("product", relatedProduct._id)}>
                  <div className="mb-4 overflow-hidden rounded-lg"><img src={relatedProduct.images?.[0] || "/placeholder.svg"} alt={relatedProduct.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" /></div>
                  <h3 className="text-lg font-medium">{relatedProduct.name}</h3>
                  <p style={{ color: storeSettings.themeColor }}>${relatedProduct.price?.toFixed(2)}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtisanElegantProductDetailsPage