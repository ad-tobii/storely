// src/lib/axios.js
//adeksss
import axios from 'axios';

// 1. Get the base URL from Vite's environment variables.
// This is the ONLY line that needs to be aware of the environment.
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
console.log("Full env:", import.meta.env);

// 2. Add a development-time check to ensure the variable is actually set.
// This helps catch configuration errors early.
if (!apiBaseURL) {
  throw new Error("FATAL: VITE_API_BASE_URL is not defined. Please check your .env files.");
}

// 3. Create the Axios instance using the dynamic URL.
export const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  timeout: 60000,
  maxContentLength: 50 * 1024 * 1024,
  maxBodyLength: 50 * 1024 * 1024,
});

// 4. Interceptors remain unchanged. They are environment-agnostic.
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    if (
      (error.code === 'ECONNRESET' || 
       error.code === 'ECONNABORTED' || 
       error.code === 'ETIMEDOUT') &&
      config &&
      !config.__isRetryRequest &&
      config.retry > 0
    ) {
      config.__isRetryRequest = true;
      config.retry -= 1;
      const delay = config.retryDelay || 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return axiosInstance(config);
    }

    return Promise.reject(error);
  }
);