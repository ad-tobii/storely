// --- START OF FILE src/pages/Templates/ArtisanElegant/ArtisanElegantCartPage.jsx ---

import { useState } from 'react';
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import useCartStore from '../../../../store/useCartStore';

const ArtisanElegantCartPage = ({ storeSettings, navigate }) => {
    const { items, updateQuantity, removeFromCart, getTotalPrice, checkout } = useCartStore();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        setError(null);
        try {
            await checkout();
            // The success alert/navigation is handled by the global CartPage component
            // to ensure the cart is properly cleared before redirecting.
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during checkout. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };
    
    return (
        <div className="artisan-elegant-cart-page py-12 px-4" style={{ backgroundColor: storeSettings.backgroundColor }}>
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: storeSettings.primaryTextColor }}>
                    Your Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items Column */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(item => (
                            <div key={item.productId} className="flex items-center p-4 gap-4 border rounded-lg shadow-sm" style={{ borderColor: storeSettings.secondaryColor + '40', backgroundColor: '#fff' }}>
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <div className="flex-grow">
                                    <h2 className="text-lg font-medium" style={{ color: storeSettings.primaryTextColor }}>{item.name}</h2>
                                    <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center border rounded-md" style={{ borderColor: storeSettings.secondaryColor, color: storeSettings.primaryTextColor }}>
                                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2 transition-colors hover:bg-gray-100"><Minus size={14} /></button>
                                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2 transition-colors hover:bg-gray-100"><Plus size={14} /></button>
                                </div>
                                <p className="font-semibold w-24 text-right" style={{ color: storeSettings.primaryTextColor }}>${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.productId)} className="text-gray-500 hover:text-red-500 p-2"><Trash2 size={18} /></button>
                            </div>
                        ))}
                         <button onClick={navigate} className="mt-6 flex items-center gap-2 text-sm hover:underline" style={{ color: storeSettings.themeColor }}>
                            <ArrowLeft size={16} /> Back to Shop
                        </button>
                    </div>

                    {/* Summary Column */}
                    <div className="lg:col-span-1">
                        <div className="p-6 rounded-lg shadow-md sticky top-24" style={{ backgroundColor: storeSettings.secondaryColor + '15' }}>
                            <h2 className="text-2xl font-bold mb-6 border-b pb-4" style={{color: storeSettings.primaryTextColor, borderColor: storeSettings.secondaryColor + '40'}}>Order Summary</h2>
                            <div className="flex justify-between items-center mb-4 text-lg">
                                <span style={{ color: storeSettings.secondaryTextColor }}>Subtotal</span>
                                <span className="font-bold" style={{ color: storeSettings.primaryTextColor }}>${getTotalPrice().toFixed(2)}</span>
                            </div>
                            <p className="text-sm mb-2" style={{ color: storeSettings.secondaryTextColor }}>Shipping & taxes are not applicable for Cash on Delivery.</p>
                            <p className="text-sm mb-6 font-bold text-center p-2 rounded" style={{ color: storeSettings.themeColor, backgroundColor: storeSettings.themeColor + '10' }}>
                                Payment Method: Cash on Delivery
                            </p>
                            
                            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full py-3 px-6 rounded-md text-white font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                                style={{ backgroundColor: storeSettings.themeColor }}
                            >
                                {isCheckingOut ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanElegantCartPage;