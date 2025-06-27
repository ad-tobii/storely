import express from 'express';
import { trackProductView, initiateCartSession } from '../controllers/tracking.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// A middleware to make user optional for tracking
const optionalProtectRoute = (req, res, next) => {
    if (req.cookies.jwt) {
        return protectRoute(req, res, next);
    }
    // If no token, just proceed without a user object
    next();
};

// @route   POST /api/tracking/product-view
// @desc    Track a view for a specific product
// @access  Public / Private
router.post('/product-view', optionalProtectRoute, trackProductView);

// ✅ NEW ROUTE
// @route   POST /api/tracking/cart-initiate
// @desc    Creates a cart session record when checkout begins
// @access  Public / Private
router.post('/cart-initiate', optionalProtectRoute, initiateCartSession);

export default router;