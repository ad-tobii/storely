import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isVerified: false,
  role: null,
  isInitializing: true, // Defaults to true, so the app waits for the first check

  sellerSignup: async ({ firstname, lastname, email, storename, password, role }) => {
    set({ isLoading: true, error: null });
    try {
      if(role){ set({role}) } else { throw new Error ("Role not set!") }
      const fullname= firstname + " " + lastname;
      const response = await axiosInstance.post('/auth/signup', { fullname, email, storename, password, role });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false, role: response.data.user.role });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Signup failed', isLoading: false });
      throw error;
    }
  },

  customerSignup: async ({ fullname, email, password, role }) => {
    set({ isLoading: true, error: null });
    try {
      if(role){ set({role}) } else { throw new Error ("Role not set!") }
      const response = await axiosInstance.post('/auth/signup', { fullname, email, password, role });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false, role: response.data.user.role });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Signup failed', isLoading: false });
      throw error;
    }
  },

  login: async ({ email, password, role }) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post('/auth/login', { email, password, role });
      const user = await get().checkAuth(); 
      set({ isLoading: false });
      return user; 
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
      throw error;
    }
  },

  getOtp: async () => {
    const { user, role } = get();
    if (!user || !role) { throw new Error("User or role not available for OTP request.") }
    set({ isLoading: true, error: null });
    try {
      console.log("this is what im talking about", user, role)
      const response = await axiosInstance.post('/auth/getOtp', { email: user.email, role });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to send OTP', isLoading: false });
      throw error;
    }
  },

  verifyOtp: async ({ email, otp }) => {
    const role = get().role;
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post('/auth/verifyOtp', { email, otp, role });
      const user = await get().checkAuth();
      set({ isLoading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'OTP verification failed', isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
        await axiosInstance.post('/auth/logout');
    } catch (error) {
        console.error("Logout API call failed, but clearing state anyway.", error);
    } finally {
        set({ user: null, isAuthenticated: false, error: null, isLoading: false, role: null, isInitializing: false });
    }
  },
  
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth", { withCredentials: true });
      set({
        user: res.data.user,
        role: res.data.user.role,
        isAuthenticated: true,
        isVerified: res.data.user.isVerified,
      });
      return res.data.user;
    } catch (err) {
      set({ user: null, isAuthenticated: false, role: null, error: null });
      return null;
    } finally {
      set({ isInitializing: false, isLoading: false });
    }
  }
}));