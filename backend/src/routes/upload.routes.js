// --- START OF FILE /routes/upload.routes.js ---

import express from "express";
import upload from "../middleware/upload.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import Seller from "../models/seller.models.js";
import ArtisanElegantSettings from "../templates/ArtisanElegantSettings.templates.js";
import BoldMinimalistSettings from "../templates/BoldMinimalistSettings.templates.js";
import PlayfulColorfulSettings from "../templates/PlayfulColorfulSettings.templates.js";
import ModernSleekSettings from "../templates/ModernSleekSettings.templates.js";

const router = express.Router();

// Template to model mapping
const templateModelMap = {
  ArtisanElegant: { model: ArtisanElegantSettings },
  BoldMinimalist: { model: BoldMinimalistSettings },
  PlayfulColorful: { model: PlayfulColorfulSettings },
  ModernSleek: { model: ModernSleekSettings },
};

// ✅ FIXED: Moved the specific '/product' route BEFORE the dynamic '/:sellerId' route.
// POST - Upload an image for a product
router.post('/product', protectRoute, upload.single('productImage'), (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: "No image file provided." });
      }
      
      const imageUrl = req.file.path;
      console.log('Product image uploaded to:', imageUrl);

      res.status(200).json({ imageUrl });

  } catch (error) {
      console.error("Product image upload error:", error);
      res.status(500).json({ message: "Image upload failed." });
  }
});


// POST - Upload image for a template setting (e.g., editable images in the editor)
// This route now correctly handles only dynamic IDs and not the word "product".
router.post("/:sellerId", protectRoute, upload.single("image"), async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const { settingKey } = req.body;

    if (!req.file) return res.status(400).json({ error: "No image file provided" });
    if (!settingKey) return res.status(400).json({ error: "Setting key is required" });

    const seller = await Seller.findById(sellerId);
    if (!seller) return res.status(404).json({ error: "Seller not found" });
    if (req.user._id.toString() !== sellerId) return res.status(403).json({ error: "Unauthorized" });

    const imageUrl = req.file.path;
    const { model } = templateModelMap[seller.template];
    const settings = await model.findById(seller.storeSettingsRef);
    if (!settings) return res.status(404).json({ error: 'Settings not found for this seller' });
    
    if (!settings.images) settings.images = new Map();
    settings.images.set(settingKey, imageUrl);
    const updatedSettings = await settings.save();

    res.json({
      imageUrl,
      settings: updatedSettings,
      message: "Image uploaded successfully",
    });

  } catch (error) {
    console.error("Template image upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;