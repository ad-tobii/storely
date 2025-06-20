import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createOrder, getCustomerOrdersForStore } from '../controllers/order.controllers.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private (Customer)
router.post('/', protectRoute, createOrder);

// @route   GET /api/orders/store/:sellerId
// @desc    Get all orders for the logged-in customer for a specific store
// @access  Private (Customer)
router.get('/store/:sellerId', protectRoute, getCustomerOrdersForStore);


export default router;