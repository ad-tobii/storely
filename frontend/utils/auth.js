// src/utils/auth.js
import { axiosInstance } from '../lib/axios';

/**
 * A simple utility to check if the user is authenticated by hitting a protected backend route.
 * Relies on the browser sending the HttpOnly session cookie.
 * @returns {Promise<boolean>} - True if authenticated, false otherwise.
 */
export const checkAuth = async () => {
  try {
    // The '/api/auth/checkAuth' endpoint is protected. A 200 OK response means the cookie is valid.
    const res = await axiosInstance.get('/auth/checkAuth');
    // If we get a user object back, they are authenticated.
    return !!res.data.user;
  } catch (error) {
    // Any error (e.g., 401 Unauthorized) means the user is not authenticated.
    // We log the error but return false to the caller.
    console.error("Authentication check failed:", error.response?.data?.message || error.message);
    return false;
  }
};