// --- START OF FILE /pages/public/Storefront.jsx ---

"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from "../../lib/axios"
import { Loader2 } from 'lucide-react';

// Import all the template App components
import ArtisanElegantApp from './Templates/ArtisanElegant/ArtisanElegantApp';
import BoldMinimalistApp from './Templates/BoldMinimalist/BoldMinimalistApp';
import ModernSleekApp from './Templates/ModernSleek/ModernSleekApp';
import PlayfulColorfulApp from './Templates/PlayfulColorful/PlayfulColorfulApp';

export default function Storefront() {
    const { storename } = useParams();
    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStoreData = async () => {
            if (!storename) return;
            
            setLoading(true);
            setError(null);
            try {
                const response = await axiosInstance.get(`/public/store/${storename}`);
                console.log(response);
                // Combine products into the settings object for easier prop passing,
                // as this is how the templates expect it.
                const data = response.data;
                data.settings.products = data.products;

                setStoreData(data);

            } catch (err) {
                console.error("Error fetching store data:", err);
                setError(err.response?.data?.message || "Could not find this store.");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [storename]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
                <Loader2 className="w-12 h-12 animate-spin text-[#32cd32]" />
                <p className="mt-4 text-lg">Loading Store...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
                <h1 className="text-4xl font-bold text-red-500">404 - Not Found</h1>
                <p className="mt-4 text-lg text-zinc-300">{error}</p>
            </div>
        );
    }

    if (!storeData) {
        return null; // Should be covered by loading/error states
    }

    const { seller, settings } = storeData;

    // The props for the template components. Note `editMode` is false.
    const templateProps = {
        editMode: false,
        storeSettings: settings,
        seller: seller,
        sellerId: seller._id,
    };
    
    // Dynamically render the correct template based on the seller's choice
    switch (seller.template) {
        case "ArtisanElegant":
            return <ArtisanElegantApp {...templateProps} />;
        case "BoldMinimalist":
            return <BoldMinimalistApp {...templateProps} />;
        case "ModernSleek":
            return <ModernSleekApp {...templateProps} />;
        case "PlayfulColorful":
            return <PlayfulColorfulApp {...templateProps} />;
        default:
            return (
                <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-white">
                    <p>This store's template is not configured correctly.</p>
                </div>
            );
    }
}