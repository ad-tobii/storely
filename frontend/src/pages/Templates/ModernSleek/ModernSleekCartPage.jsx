// --- START OF FILE src/pages/Templates/ModernSleek/ModernSleekCartPage.jsx ---

import { useState } from 'react';
import { Plus, Minus, X, ArrowLeft } from 'lucide-react';
import useCartStore from '../../../../store/useCartStore';

const ModernSleekCartPage = ({ storeSettings, navigate }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, checkout } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);
    try {
      await checkout();
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="modern-sleek-cart py-20 px-4" style={{ backgroundColor: storeSettings.backgroundColor, color: storeSettings.primaryTextColor }}>
      <div className="container mx-auto max-w-6xl">
        <h1
          className="text-5xl font-extrabold mb-12 text-center uppercase tracking-wider"
          style={{ color: storeSettings.primaryTextColor }}
        >
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-6 gap-4 items-center p-4 border rounded-md"
                  style={{ borderColor: storeSettings.secondaryColor, backgroundColor: storeSettings.secondaryColor + '30' }}
                >
                  <div className="col-span-3 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover bg-gray-800"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{item.name}</h2>
                      <p className="text-sm" style={{ color: storeSettings.secondaryTextColor }}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center border" style={{borderColor: storeSettings.secondaryTextColor}}>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-3 hover:bg-gray-700/50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-3 hover:bg-gray-700/50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <p className="font-semibold text-lg w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="text-right">
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-gray-500 hover:text-red-500 p-2"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={navigate} className="mt-6 flex items-center gap-2 text-sm hover:underline" style={{ color: storeSettings.themeColor }}>
                    <ArrowLeft size={16} /> Back to Collection
              </button>
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <div className="p-8 border sticky top-24 rounded-lg" style={{ borderColor: storeSettings.secondaryColor, backgroundColor: storeSettings.secondaryColor + '30' }}>
                <h2 className="text-2xl font-bold mb-6 border-b pb-4" style={{borderColor: storeSettings.secondaryColor}}>SUMMARY</h2>
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span style={{color: storeSettings.secondaryTextColor}}>Subtotal</span>
                  <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <p className="text-sm mb-4" style={{ color: storeSettings.secondaryTextColor }}>
                  Payment via Cash on Delivery.
                </p>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 px-8 font-semibold rounded-sm text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-60"
                  style={{ backgroundColor: storeSettings.themeColor }}
                >
                  {isCheckingOut ? 'PROCESSING...' : 'CHECKOUT'}
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ModernSleekCartPage;