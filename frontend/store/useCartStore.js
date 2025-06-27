import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../lib/axios';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [], // { productId, name, price, image, quantity, sellerId }
            
            addToCart: (product, sellerId, quantity = 1) => {
                const { items } = get();
                const existingItem = items.find(item => item.productId === product._id);
                
                // Carts are per-seller. Clear cart if adding from a different seller.
                const currentSellerId = items.length > 0 ? items[0].sellerId : null;
                if (currentSellerId && currentSellerId !== sellerId) {
                    set({ items: [] });
                }

                if (existingItem) {
                    set(state => ({
                        items: state.items.map(item => 
                            item.productId === product._id 
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    }));
                } else {
                    set(state => ({
                        items: [...state.items, { 
                            productId: product._id, 
                            name: product.name,
                            price: product.price,
                            image: product.images?.[0] || '/placeholder.svg',
                            quantity: quantity,
                            sellerId: sellerId,
                         }]
                    }));
                }
            },

            removeFromCart: (productId) => {
                set(state => ({
                    items: state.items.filter(item => item.productId !== productId)
                }));
            },

            updateQuantity: (productId, quantity) => {
                const newQuantity = Math.max(1, quantity);
                set(state => ({
                    items: state.items.map(item => 
                        item.productId === productId 
                            ? { ...item, quantity: newQuantity } 
                            : item
                    )
                }));
            },
            
            clearCart: () => {
                set({ items: [] });
            },

            getTotalItems: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },
            
            getTotalPrice: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            // Checkout action
            checkout: async (shippingAddress) => {
                const { items, getTotalPrice, clearCart } = get();
                if (items.length === 0) throw new Error("Cart is empty");

                const orderData = {
                    sellerId: items[0].sellerId,
                    items: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    })),
                    totalAmount: getTotalPrice(),
                    shippingAddress: shippingAddress || { details: "Cash on Delivery - Address TBD" },
                };
                
                try {
                    const response = await axiosInstance.post('/orders', orderData);
                    clearCart();
                    return response.data;
                } catch (error) {
                    console.error("Checkout failed:", error);
                    throw error.response?.data || new Error("Checkout failed");
                }
            }
        }),
        {
            name: 'cart-storage', // name of the item in the storage (must be unique)
        }
    )
);

export default useCartStore;