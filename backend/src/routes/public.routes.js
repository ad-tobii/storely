// --- START OF FILE /routes/public.routes.js ---

import express from 'express';
import mongoose from 'mongoose'; // Import mongoose
import Seller from '../models/seller.models.js';
import Product from '../models/product.models.js';

const router = express.Router();

// ✅ NEW: Add an endpoint to get basic public seller info by ID.
// This is needed by the CartPage to get the template and storename for UI rendering.
router.get('/seller/:sellerId', async (req, res) => {
    try {
        const { sellerId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(sellerId)) {
            return res.status(400).json({ message: "Invalid seller ID format." });
        }

        const seller = await Seller.findById(sellerId).select('storename template'); // Only select the public fields needed for the UI

        if (!seller) {
            return res.status(404).json({ message: "Seller not found for the given ID." });
        }

        res.status(200).json(seller); // Send back { _id, storename, template }

    } catch (error) {
        console.error("Error fetching public seller data by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// GET /api/public/store/:storename
router.get('/store/:storename', async (req, res) => {
    try {
        const { storename } = req.params;

        if (!storename) {
            return res.status(400).json({ message: "Store name is required." });
        }

        // Step 1: Find the seller by their unique `storename`.
        const seller = await Seller.findOne({ 
            storename: { $regex: new RegExp(`^${storename}$`, 'i') } 
        });
        
        if (!seller) {
            return res.status(404).json({ message: "Store not found." });
        }

        // Step 2: Populate the settings reference.
        // Make sure to use the correct model name stored in the seller document
        const populatedSeller = await seller.populate({
            path: 'storeSettingsRef',
            model: seller.storeSettingsModel,
        });

        // Step 3: Fetch all products for this seller.
        const products = await Product.find({ seller: populatedSeller._id });

        // Sanitize the data to only send what's necessary
        const publicSellerData = {
            _id: populatedSeller._id,
            storename: populatedSeller.storename,
            storeLogoUrl: populatedSeller.storeLogoUrl,
            heroImageUrl: populatedSeller.heroImageUrl,
            template: populatedSeller.template,
            contactInfo: populatedSeller.contactInfo,
        };

        res.status(200).json({
            seller: publicSellerData,
            settings: populatedSeller.storeSettingsRef,
            products: products
        });

    } catch (error) {
        console.error("Error fetching public store data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;