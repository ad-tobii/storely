// src/pages/Templates/BoldMinimalist/BoldMinimalistProductDetailsPage.jsx
"use client"

import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useCartStore from "../../../../store/useCartStore"
import { checkAuth } from "../../../../utils/auth"
import { useVisitTracker } from "../../hooks/useVisitTracker"
import { axiosInstance } from "../../../../lib/axios"

const BoldMinimalistProductDetailsPage = ({ product, navigate: templateNavigate, seller }) => {
  const { addToCart } = useCartStore();
  const reactRouterNavigate = useNavigate();

  // ✅ FIXED: The hook is now simpler and only needs the seller's ID.
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
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      addToCart(product, seller._id, 1); // Quantity is always 1 for this design
      alert(`${product.name} ADDED TO CART.`);
    } else {
      reactRouterNavigate(`/login?redirect=${encodeURIComponent(window.location.href)}`);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-black mb-8">PRODUCT NOT FOUND</h1>
        <button onClick={() => templateNavigate("shop")} className="px-8 py-4 bg-black text-white font-black uppercase">BACK TO SHOP</button>
      </div>
    )
  }

  return (
    <div className="bold-minimalist-product-details py-16 px-8">
      <div className="container mx-auto">
        <div className="mb-12"><button onClick={() => templateNavigate("shop")} className="flex items-center gap-2 font-bold uppercase tracking-widest hover:underline"><ArrowLeft size={20} /> BACK TO SHOP</button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="border-4 border-black"><img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-auto object-cover"/></div>
          <div>
            <h1 className="text-5xl font-black mb-6 uppercase tracking-widest">{product.name}</h1>
            <p className="text-5xl font-black mb-8">${product.price?.toFixed(2)}</p>
            <div className="prose font-bold text-xl leading-relaxed mb-8"><p>{product.description}</p></div>
            <button onClick={handleAddToCart} className="w-full px-8 py-6 bg-black text-white font-black text-xl uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-colors">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoldMinimalistProductDetailsPage