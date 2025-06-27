// --- START OF FILE src/pages/Templates/BoldMinimalist/BoldMinimalistCartPage.jsx ---

import { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import useCartStore from '../../../../store/useCartStore';

const BoldMinimalistCartPage = ({ navigate }) => {
    const { items, removeFromCart, getTotalPrice, checkout, updateQuantity } = useCartStore(); // Added updateQuantity
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        setError(null);
        try {
            await checkout();
        } catch (err) {
            setError(err.response?.data?.message || "CHECKOUT FAILED. TRY AGAIN.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="bold-minimalist-cart py-16 px-8 bg-white text-black">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-black uppercase tracking-widest mb-8">CART</h1>
                    <div className="w-24 h-2 mx-auto bg-black"></div>
                </div>

                <div className="border-4 border-black">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-6 p-6 font-black uppercase tracking-widest border-b-4 border-black">
                        <div className="col-span-5">PRODUCT</div>
                        <div className="col-span-3 text-center">QUANTITY</div>
                        <div className="col-span-3 text-right">TOTAL</div>
                        <div className="col-span-1 text-right"></div>
                    </div>

                    {/* Cart Items */}
                    {items.map(item => (
                        <div key={item.productId} className="grid grid-cols-12 gap-6 items-center p-6 border-b-4 border-black last:border-b-0">
                            <div className="col-span-5 font-bold uppercase tracking-wider">{item.name}</div>
                            <div className="col-span-3 text-center font-black text-2xl">{item.quantity}</div>
                            <div className="col-span-3 text-right font-black text-2xl">${(item.price * item.quantity).toFixed(2)}</div>
                            <div className="col-span-1 text-right">
                                <button onClick={() => removeFromCart(item.productId)} className="text-black hover:text-red-500 p-2">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {/* Summary & Checkout */}
                    <div className="p-8 bg-black text-white">
                        <div className="flex justify-between items-center">
                            <span className="text-3xl font-black uppercase tracking-widest">TOTAL</span>
                            <span className="text-5xl font-black">${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <p className="text-right text-sm uppercase tracking-wider mt-2">PAYMENT: CASH ON DELIVERY</p>
                        
                        {error && <p className="text-red-400 text-center font-bold uppercase tracking-wider mt-6">{error}</p>}
                        
                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full mt-8 py-6 bg-white text-black font-black text-xl uppercase tracking-widest border-4 border-white hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                        >
                            {isCheckingOut ? "PLACING ORDER..." : "PLACE ORDER"}
                        </button>
                    </div>
                </div>
                 <button onClick={navigate} className="mt-8 flex items-center gap-2 font-bold uppercase tracking-widest hover:underline">
                    <ArrowLeft size={20} /> Back to Shop
                </button>
            </div>
        </div>
    );
};

export default BoldMinimalistCartPage;