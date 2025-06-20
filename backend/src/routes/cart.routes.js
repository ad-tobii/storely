import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import Seller from '../models/seller.models.js';

// Controller function to check access and get initial data for the cart.
const checkCartAccess = async (req, res) => {
    // The protectRoute middleware has already verified the user.
    // We can add an extra check to ensure the role is 'customer'.
    if (req.user.role !== 'customer') {
        return res.status(403).json({ message: "Forbidden: Only customers can access the cart." });
    }

    // Since the check passed, we find the seller associated with the cart items.
    // NOTE: In this implementation, we assume the client-side cart (Zustand)
    // holds the sellerId. A more robust DB-backed cart would fetch it here.
    // For now, just confirming access is sufficient.
    res.status(200).json({ 
        message: "Access granted.",
        user: req.user // Send user data back to the client.
    });
};

const router = express.Router();

// @route   GET /api/cart/check-access
// @desc    A protected endpoint that only authenticated customers can reach.
// @access  Private (Customer)
router.get('/check-access', protectRoute, checkCartAccess);

export default router;