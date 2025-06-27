// --- START OF FILE src/pages/CartPage.jsx ---

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../lib/axios';
import useCartStore from '../../store/useCartStore';

// Import all template UI components
import ArtisanElegantCartPageUI from './Templates/ArtisanElegant/ArtisanElegantCartPage';
import BoldMinimalistCartPageUI from './Templates/BoldMinimalist/BoldMinimalistCartPage';
import PlayfulColorfulCartPageUI from './Templates/PlayfulColorful/PlayfulColorfulCartPage';
import ModernSleekCartPageUI from './Templates/ModernSleek/ModernSleekCartPage';
import { Loader2 } from 'lucide-react';

const templateUIMap = {
    ArtisanElegant: ArtisanElegantCartPageUI,
    BoldMinimalist: BoldMinimalistCartPageUI,
    PlayfulColorful: PlayfulColorfulCartPageUI,
    ModernSleek: ModernSleekCartPageUI,
};

export default function CartPage() {
    const navigate = useNavigate();
    const [storeData, setStoreData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { items } = useCartStore();

    useEffect(() => {
        const verifyAccessAndLoadData = async () => {
            setIsLoading(true);

            if (items.length === 0) {
                setIsLoading(false);
                return;
            }
            
            try {
                // ✅ FIXED: Call the correct '/cart/check-access' route.
                await axiosInstance.get('/cart/check-access');
                
                const sellerId = items[0].sellerId;
                const sellerInfoResponse = await axiosInstance.get(`/public/seller/${sellerId}`);
                const { storename } = sellerInfoResponse.data;
                const storeResponse = await axiosInstance.get(`/public/store/${storename}`);
                
                const data = storeResponse.data;
                data.settings.products = data.products; 
                setStoreData(data);
                
            } catch (err) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate(`/login?redirect=/cart`);
                } else {
                    console.error("Failed to load cart page:", err);
                    setError("Could not load store information for your cart.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        verifyAccessAndLoadData();
    }, [items, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-zinc-900">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
        );
    }
    
    if (error) {
        return <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-red-400">{error}</div>;
    }

    if (items.length === 0) {
        return (
           <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
               <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
               <p className="text-lg text-gray-600 mb-8">Let's find something amazing for you!</p>
               <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                   Go Shopping
               </button>
           </div>
       );
   }

    if (!storeData) {
        return <div>Error: Could not load store information for your cart items.</div>;
    }

    const TemplateComponent = templateUIMap[storeData.seller.template];
    if (!TemplateComponent) {
        return <div>Error: Store template not found.</div>;
    }
    
    const navigateToShop = () => navigate(`/store/${storeData.seller.storename}`);

    return (
        <TemplateComponent 
            storeSettings={storeData.settings} 
            seller={storeData.seller}
            navigate={navigateToShop}
        />
    );
}