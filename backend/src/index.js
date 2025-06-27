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
import marketingRoutes from './routes/marketing.routes.js'; // ✅ IMPORT MARKETING ROUTES

dotenv.config();
const app = express();
const port = process.env.PORT;

const origin = process.env.ENVIRONMENT === 'development' ? 'http://localhost:5173' : 'https://your-production-url.com';

app.use(morgan("dev"))
app.use(cookieParser());
app.use(cors({ origin, credentials: true }));
app.use(express.json());

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
app.use('/api/marketing', marketingRoutes); // ✅ MOUNT MARKETING ROUTES

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  connectDB();
});