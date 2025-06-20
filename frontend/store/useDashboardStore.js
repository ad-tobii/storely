import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useDashboardStore = create((set, get) => ({
    // Data states
    analytics: null, 
    recentOrders: [],
    orders: null,      
    products: null,    
    customers: null,   
    
    // UI states
    isLoading: true, 
    error: null,
    timeframe: '30',

    setTimeframe: (newTimeframe) => {
        set({ timeframe: newTimeframe });
        get().fetchAnalytics(); // Refetch analytics when timeframe changes
    },

    // --- READ ACTIONS ---
    fetchAnalytics: async () => {
        set({ isLoading: true });
        try {
            const timeframe = get().timeframe;
            const response = await axiosInstance.get(`/dashboard/analytics?timeframe=${timeframe}`);
            set({ analytics: response.data, isLoading: false });
        } catch (err) {
            set({ error: err.message, isLoading: false, analytics: null });
        }
    },

    fetchInitialDashboard: async () => {
        set({ isLoading: true });
        await Promise.all([
            get().fetchAnalytics(),
            get().fetchOrders(5) // Fetch 5 most recent for overview
        ]);
        set({ isLoading: false });
    },

    fetchOrders: async (limit = null) => {
        if (get().orders !== null && !limit) return; // Don't refetch full list
        try {
            const url = limit ? `/dashboard/orders?limit=${limit}` : '/dashboard/orders';
            const response = await axiosInstance.get(url);
            if(limit) {
                set({ recentOrders: response.data });
            } else {
                set({ orders: response.data });
            }
        } catch (err) { set({ error: err.message }); }
    },

    fetchProducts: async () => {
        if (get().products !== null) return;
        try {
            const response = await axiosInstance.get('/dashboard/products');
            set({ products: response.data });
        } catch (err) { set({ error: err.message }); }
    },

    fetchCustomers: async () => {
        if (get().customers !== null) return;
        try {
            const response = await axiosInstance.get('/dashboard/customers');
            set({ customers: response.data });
        } catch (err) { set({ error: err.message }); }
    },

    // --- WRITE ACTIONS ---
    addProduct: async (productData) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('/dashboard/products', productData);
            const newProduct = response.data;
            set(state => ({ 
                products: state.products ? [newProduct, ...state.products] : [newProduct],
                isLoading: false 
            }));
            return newProduct;
        } catch (error) { 
            console.error("Error adding product:", error);
            set({ error: error.response?.data?.message || 'Failed to add product', isLoading: false });
            throw error; 
        }
    },

    updateProduct: async (productId, productData) => {
        const originalProducts = get().products;
        set(state => ({
            products: state.products.map(p => p._id === productId ? { ...p, ...productData } : p)
        }));
        try {
            await axiosInstance.patch(`/dashboard/products/${productId}`, productData);
        } catch (error) { 
            set({ products: originalProducts }); 
            throw error;
        }
    },

    deleteProduct: async (productId) => {
        const originalProducts = get().products;
        set(state => ({
            products: state.products.filter(p => p._id !== productId)
        }));
        try {
            await axiosInstance.delete(`/dashboard/products/${productId}`);
        } catch (error) { 
            set({ products: originalProducts }); 
            throw error;
        }
    },

    fulfillOrder: async (orderId) => {
        const originalOrders = get().orders;
        const originalRecentOrders = get().recentOrders;

        const updateFn = (o) => o._id === orderId ? { ...o, status: 'fulfilled' } : o;
        
        set(state => ({
            orders: state.orders ? state.orders.map(updateFn) : null,
            recentOrders: state.recentOrders.map(updateFn),
        }));
        try {
            await axiosInstance.patch(`/dashboard/orders/${orderId}`, { status: 'fulfilled' });
        } catch (error) { 
            set({ orders: originalOrders, recentOrders: originalRecentOrders });
            throw error; 
        }
    },
}));

export default useDashboardStore;