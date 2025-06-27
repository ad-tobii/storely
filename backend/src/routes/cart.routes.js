import express from 'express';
import { protectCustomerRoute } from '../middleware/customer.middleware.js';
// ✅ RENAMED CONTROLLER FOR CONSISTENCY
import { checkCartAccess } from '../controllers/cart.controllers.js';

const router = express.Router();

// @route   GET /api/cart/check-access
// @desc    A protected endpoint that only authenticated CUSTOMERS can reach. Used by the frontend before viewing the cart or adding items.
// @access  Private (Customer Only)
// ✅ RENAMED ROUTE BACK TO '/check-access'
router.get('/check-access', protectCustomerRoute, checkCartAccess);

export default router;