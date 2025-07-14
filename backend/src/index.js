// --- START OF FILE /index.js ---

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from "morgan"
import upload from "./routes/upload.routes.js"
import { connectDB } from './lib/db.js';

// Route imports
import publicRoutes from './routes/public.routes.js';
import authRoutes from './routes/auth.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import storeEditorRoutes from './routes/store.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js';
import orderRoutes from './routes/order.routes.js';
import visitRoutes from './routes/visit.routes.js';
import onboardingRoutes from "./routes/onboarding.routes.js"
import cartRoutes from "./routes/cart.routes.js";
import trackingRoutes from './routes/tracking.routes.js';
import reviewRoutes from './routes/review.routes.js';
import marketingRoutes from './routes/marketing.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; // Use Railway's port or default to 3000

// --- Production-Ready CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5173', // Your local frontend for development
  process.env.FRONTEND_PROD_URL, // Your production frontend URL from .env
].filter(Boolean); // This removes any falsy values (e.g., if FRONTEND_PROD_URL is not set)

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, mobile apps, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from your origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(morgan("dev"))
app.use(cookieParser());
app.use(cors(corsOptions)); // Use the new dynamic cors options
app.use(express.json());

// --- Trust Proxy for Production ---
// This is crucial for services like Railway that use a reverse proxy.
// It ensures express gets the correct IP address and protocol (http vs https).
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // Trust the first proxy
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/sellers', storeEditorRoutes);
app.use('/api/upload', upload);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/tracking', trackingRoutes); 
app.use('/api/reviews', reviewRoutes);
app.use('/api/marketing', marketingRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  connectDB();
});