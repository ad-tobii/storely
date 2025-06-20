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
    const { items } = useCartStore();

    useEffect(() => {
        const fetchStoreDataForUI = async () => {
            if (items.length > 0) {
                try {
                    const sellerId = items[0].sellerId;
                    
                    // ✅ FIXED: This flow now works correctly with the new backend route.
                    // Step 1: Get the seller's public info (storename, template) using their ID.
                    const sellerInfoResponse = await axiosInstance.get(`/public/seller/${sellerId}`);
                    const { storename } = sellerInfoResponse.data;

                    // Step 2: Use the fetched storename to get the full public store data (settings, products).
                    const storeResponse = await axiosInstance.get(`/public/store/${storename}`);
                    const data = storeResponse.data;
                    
                    // Combine data for the template component as it expects products within settings
                    data.settings.products = data.products; 
                    setStoreData(data);

                } catch (error) {
                    console.error("Failed to fetch store UI data:", error);
                }
            }
            setIsLoading(false);
        };
        fetchStoreDataForUI();
    }, [items]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-zinc-900">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
           <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
               <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
               <p className="text-lg text-gray-600 mb-8">Let's find something amazing for you!</p>
               <a href="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                   Go Shopping
               </a>
           </div>
       );
   }

    if (!storeData) {
        return <div>Error: Could not load store information for your cart items.</div>;
    }

    // The template comes from the full store data fetched in step 2
    const TemplateComponent = templateUIMap[storeData.seller.template];
    if (!TemplateComponent) {
        return <div>Error: Store template not found.</div>;
    }
    
    // The `navigate` function in the UI components is now simpler.
    // It can be used to go back to the shop page.
    const navigateToShop = () => navigate(`/store/${storeData.seller.storename}`);

    return (
        <TemplateComponent 
            storeSettings={storeData.settings} 
            seller={storeData.seller}
            navigate={navigateToShop} // Pass a function to go back to the shop
        />
    );
}