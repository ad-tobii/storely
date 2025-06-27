import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
  timeout: 60000, // 60 seconds
  maxContentLength: 50 * 1024 * 1024, // 50MB
  maxBodyLength: 50 * 1024 * 1024, // 50MB
});

// Add request interceptor for better error handling
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for retry logic
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;

    // Retry logic for connection errors
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
