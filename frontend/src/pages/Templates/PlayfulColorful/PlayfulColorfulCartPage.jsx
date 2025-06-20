// --- START OF FILE src/pages/Templates/PlayfulColorful/PlayfulColorfulCartPage.jsx ---

import { useState } from 'react';
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import useCartStore from '../../../../store/useCartStore';

const PlayfulColorfulCartPage = ({ storeSettings, navigate }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, checkout } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);
    try {
      await checkout();
    } catch (err) {
      setError(err.response?.data?.message || "Oh no! Something went wrong. Please try again. 😢");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="playful-colorful-cart-page py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1
          className="text-5xl font-bold mb-8 text-center"
          style={{ color: storeSettings.primaryTextColor }}
        >
          💖 Your Awesome Cart 💖
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.productId}
                  className="flex items-center p-4 gap-4 rounded-2xl shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${
                      index % 2 === 0 ? storeSettings.themeColor : storeSettings.secondaryColor
                    }15, #ffffff)`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p
                      className="text-md font-bold"
                      style={{ color: storeSettings.themeColor }}
                    >
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center border-2 border-zinc-200 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-2"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-2"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-bold text-xl w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-gray-400 hover:text-red-500 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button onClick={navigate} className="mt-6 flex items-center gap-2 text-sm font-bold hover:underline" style={{ color: storeSettings.themeColor }}>
                    <ArrowLeft size={16} /> Back to Shop
              </button>
            </div>

            <div className="lg:col-span-1">
              <div
                className="p-6 rounded-2xl shadow-xl sticky top-24"
                style={{
                  background: `linear-gradient(135deg, ${storeSettings.themeColor}20, ${storeSettings.secondaryColor}20)`,
                }}
              >
                <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">
                  Order Summary
                </h2>
                <div className="flex justify-between items-center mb-4 text-xl">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <p
                  className="text-sm mb-6 text-center font-bold p-2 rounded-full"
                  style={{ color: storeSettings.secondaryTextColor, backgroundColor: '#fff' }}
                >
                  Payment: 💵 Cash on Delivery 💵
                </p>

                {error && (
                  <p className="text-red-500 text-center text-sm mb-4">{error}</p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 px-6 rounded-full text-white font-bold text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg disabled:opacity-70"
                  style={{
                    background: `linear-gradient(135deg, ${storeSettings.themeColor}, ${storeSettings.secondaryColor})`,
                  }}
                >
                  {isCheckingOut
                    ? 'Placing Order... 🚀'
                    : 'Place My Awesome Order!'}
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default PlayfulColorfulCartPage;