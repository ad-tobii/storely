// --- START OF FILE useDashboardStore.js ---

import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useDashboardStore = create((set, get) => ({
    // Data states
    analytics: null, 
    recentOrders: [],
    orders: null,      
    products: null,    
    customers: null,   
    emailLists: null, // ✅ ADDED: Email list state
    
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
            get().fetchOrders(5), // Fetch 5 most recent for overview
            get().fetchEmailLists() // ✅ ADDED: Fetch email lists on initial load
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
    
    // ✅ NEW: Fetch all email lists
    fetchEmailLists: async () => {
        if (get().emailLists !== null) return;
        try {
            const response = await axiosInstance.get('/marketing/lists');
            set({ emailLists: response.data });
        } catch (err) {
            set({ error: err.message });
        }
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

    // ✅ NEW: Actions for Email Lists
    createEmailList: async (name) => {
        try {
            const response = await axiosInstance.post('/marketing/lists', { name });
            const newList = response.data;
            set(state => ({
                emailLists: [...state.emailLists, newList]
            }));
        } catch (error) {
            console.error("Error creating email list:", error);
            throw error;
        }
    },

    deleteEmailList: async (listId) => {
        const originalLists = get().emailLists;
        // Optimistic UI update
        set(state => ({
            emailLists: state.emailLists.filter(list => list._id !== listId)
        }));
        try {
            await axiosInstance.delete(`/marketing/lists/${listId}`);
        } catch (error) {
            console.error("Error deleting email list:", error);
            set({ emailLists: originalLists }); // Revert on failure
            throw error;
        }
    },

    addCustomersToList: async (listId, customerIds) => {
        try {
            const response = await axiosInstance.patch(`/marketing/lists/${listId}/customers`, { customerIds });
            const updatedList = response.data;
            // Update the specific list in the state
            set(state => ({
                emailLists: state.emailLists.map(list => list._id === listId ? updatedList : list)
            }));
        } catch (error) {
            console.error("Error adding customers to list:", error);
            throw error;
        }
    },

    sendEmailToList: async (listId, { subject, message }) => {
        try {
            const response = await axiosInstance.post(`/marketing/lists/${listId}/send`, { subject, message });
            return response.data; // Return success message
        } catch (error) {
            console.error("Error sending email to list:", error);
            throw error;
        }
    }
}));

export default useDashboardStore;