import ProductView from '../models/productView.models.js';
import CartSession from '../models/cartSession.models.js'; // Import the new model
import mongoose from 'mongoose';

export const trackProductView = async (req, res) => {
    try {
        const { sellerId, productId } = req.body;
        const customerId = req.user?._id; 

        if (!sellerId || !productId || !mongoose.Types.ObjectId.isValid(sellerId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Valid sellerId and productId are required." });
        }

        const newView = new ProductView({
            seller: sellerId,
            product: productId,
            customer: customerId,
        });

        await newView.save();
        res.status(202).json({ message: "View tracked." });

    } catch (error) {
        console.error("Product view tracking error:", error.message);
        res.status(500).json({ message: "Could not track view." });
    }
};

// ✅ NEW: Controller to initiate a cart session for abandonment tracking
export const initiateCartSession = async (req, res) => {
    try {
        const { sellerId, items, totalAmount } = req.body;
        const customerId = req.user?._id; // May be undefined if not logged in

        if (!sellerId || !items || !totalAmount) {
            return res.status(400).json({ message: "Missing required session information." });
        }

        const newSession = new CartSession({
            seller: sellerId,
            customer: customerId,
            items: items,
            totalAmount: totalAmount,
            status: 'initiated',
        });

        await newSession.save();
        
        // Return the ID of the new session so it can be linked to the order
        res.status(201).json({ cartSessionId: newSession._id, message: "Cart session initiated." });

    } catch (error) {
        console.error("Cart session initiation error:", error.message);
        res.status(500).json({ message: "Could not initiate cart session." });
    }
};