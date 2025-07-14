import express from "express"
import Seller from "../models/seller.models.js"
import ArtisanElegantSettings from "../templates/artisanElegantSettings.templates.js"
import BoldMinimalistSettings from "../templates/boldMinimalistSettings.templates.js"
import PlayfulColorfulSettings from "../templates/playfulColorfulSettings.templates.js"
import ModernSleekSettings from "../templates/modernSleekSettings.templates.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

// Template to model mapping
const templateModelMap = {
  ArtisanElegant: {
    model: ArtisanElegantSettings,
    modelName: "ArtisanElegantSettings",
  },
  BoldMinimalist: {
    model: BoldMinimalistSettings,
    modelName: "BoldMinimalistSettings",
  },
  PlayfulColorful: {
    model: PlayfulColorfulSettings,
    modelName: "PlayfulColorfulSettings",
  },
  ModernSleek: {
    model: ModernSleekSettings,
    modelName: "ModernSleekSettings",
  },
}

// GET - Fetch seller with populated settings using refPath
router.get("/:sellerId", protectRoute, async (req, res) => {
  try {
    const sellerId = req.params.sellerId

    // Check if user owns this seller account
    if (req.user._id.toString() !== sellerId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const seller = await Seller.findById(sellerId)
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" })
    }

    // Populate using the correct model name from the seller document
    const populatedSeller = await seller.populate({
      path: "storeSettingsRef",
      model: seller.storeSettingsModel,
    })

    res.json({
      seller: populatedSeller,
      settings: populatedSeller.storeSettingsRef,
    })
  } catch (error) {
    console.error("Error fetching seller:", error)
    res.status(500).json({ error: error.message })
  }
})

// PATCH - Update seller settings with proper nested object support
router.patch("/:sellerId/settings", protectRoute, async (req, res) => {
  try {
    const sellerId = req.params.sellerId

    // Check if user owns this seller account
    if (req.user._id.toString() !== sellerId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const seller = await Seller.findById(sellerId)
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" })
    }

    // Get the appropriate model
    const { model } = templateModelMap[seller.template]

    // Handle nested updates (like images.settingKey)
    const updateData = {}
    for (const [key, value] of Object.entries(req.body)) {
      if (key.includes(".")) {
        // Handle nested keys like "images.heroImage"
        updateData[key] = value
      } else {
        updateData[key] = value
      }
    }

    console.log("Updating settings with:", updateData)

    // Update the settings document
    const updatedSettings = await model.findByIdAndUpdate(
      seller.storeSettingsRef,
      { $set: updateData },
      { new: true, runValidators: true },
    )

    if (!updatedSettings) {
      return res.status(404).json({ error: "Settings not found" })
    }

    console.log("Settings updated successfully")

    res.json({ settings: updatedSettings })
  } catch (error) {
    console.error("Error updating settings:", error)
    res.status(500).json({ error: error.message })
  }
})

// POST - Switch template
router.post("/:sellerId/switch-template", protectRoute, async (req, res) => {
  try {
    const { template } = req.body
    const sellerId = req.params.sellerId

    // Check if user owns this seller account
    if (req.user._id.toString() !== sellerId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const seller = await Seller.findById(sellerId)
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" })
    }

    if (!templateModelMap[template]) {
      return res.status(400).json({ error: "Invalid template" })
    }

    // Create new settings document for the new template
    const { model, modelName } = templateModelMap[template]
    const newSettings = new model({
      products: getDefaultProductsForTemplate(template),
      images: new Map(),
    })
    await newSettings.save()

    // Update seller with new template and settings reference
    // Use updateOne to avoid validation issues
    await Seller.updateOne(
      { _id: sellerId },
      {
        $set: {
          template: template,
          storeSettingsModel: modelName,
          storeSettingsRef: newSettings._id,
        },
      },
    )

    // Fetch the updated seller and populate
    const updatedSeller = await Seller.findById(sellerId).populate({
      path: "storeSettingsRef",
      model: modelName,
    })

    res.json({
      seller: updatedSeller,
      settings: updatedSeller.storeSettingsRef,
    })
  } catch (error) {
    console.error("Error switching template:", error)
    res.status(500).json({ error: error.message })
  }
})

// POST - Reset settings to defaults
router.post("/:sellerId/reset-settings", protectRoute, async (req, res) => {
  try {
    const sellerId = req.params.sellerId

    // Check if user owns this seller account
    if (req.user._id.toString() !== sellerId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const seller = await Seller.findById(sellerId)
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" })
    }

    // Get the appropriate model and create new default settings
    const { model } = templateModelMap[seller.template]
    const newSettings = new model({
      products: getDefaultProductsForTemplate(seller.template),
      images: new Map(),
    })
    await newSettings.save()

    // Update seller reference using updateOne
    await Seller.updateOne(
      { _id: sellerId },
      {
        $set: {
          storeSettingsRef: newSettings._id,
        },
      },
    )

    res.json({ settings: newSettings })
  } catch (error) {
    console.error("Error resetting settings:", error)
    res.status(500).json({ error: error.message })
  }
})

// Helper function to get default products for each template
function getDefaultProductsForTemplate(template) {
  const defaultProducts = {
    ArtisanElegant: [
      {
        id: 1,
        name: "Handcrafted Ceramic Vase",
        price: 89.99,
        image: "https://via.placeholder.com/400x500?text=Ceramic+Vase",
        description:
          "A beautiful handcrafted ceramic vase, perfect for displaying your favorite flowers or as a standalone decorative piece.",
      },
      {
        id: 2,
        name: "Woven Basket Set",
        price: 65.0,
        image: "https://via.placeholder.com/400x500?text=Woven+Basket",
        description:
          "Set of three handwoven baskets made from sustainable materials. Ideal for storage or as decorative elements.",
      },
      {
        id: 3,
        name: "Artisan Wooden Bowl",
        price: 45.5,
        image: "https://via.placeholder.com/400x500?text=Wooden+Bowl",
        description:
          "Hand-carved wooden bowl made from reclaimed oak. Each piece is unique with natural grain patterns.",
      },
      {
        id: 4,
        name: "Hand-Poured Candle",
        price: 28.0,
        image: "https://via.placeholder.com/400x500?text=Artisan+Candle",
        description: "Soy wax candle hand-poured into a recycled glass container. Available in various natural scents.",
      },
    ],
    BoldMinimalist: [
      {
        id: 1,
        name: "ESSENTIAL CHAIR",
        price: 299.99,
        image: "https://via.placeholder.com/400x500?text=ESSENTIAL+CHAIR",
        description:
          "Pure form meets function. This chair represents the essence of seating reduced to its most fundamental elements.",
      },
      {
        id: 2,
        name: "MINIMAL TABLE",
        price: 599.0,
        image: "https://via.placeholder.com/400x500?text=MINIMAL+TABLE",
        description:
          "A statement in simplicity. Clean lines and perfect proportions define this essential piece for modern living.",
      },
      {
        id: 3,
        name: "BOLD LAMP",
        price: 199.5,
        image: "https://via.placeholder.com/400x500?text=BOLD+LAMP",
        description:
          "Light in its purest form. This lamp eliminates all but the essential elements of illumination and design.",
      },
      {
        id: 4,
        name: "PURE VASE",
        price: 149.0,
        image: "https://via.placeholder.com/400x500?text=PURE+VASE",
        description:
          "Form without compromise. A vessel that celebrates the beauty of negative space and clean geometry.",
      },
    ],
    PlayfulColorful: [
      {
        id: 1,
        name: "Rainbow Wall Art",
        price: 45.99,
        image: "https://via.placeholder.com/400x500?text=Rainbow+Art",
        description: "Bright and cheerful wall art to add color to any space.",
      },
      {
        id: 2,
        name: "Colorful Throw Pillows",
        price: 29.99,
        image: "https://via.placeholder.com/400x500?text=Throw+Pillows",
        description: "Set of vibrant throw pillows to brighten up your living space.",
      },
      {
        id: 3,
        name: "Fun Storage Bins",
        price: 35.0,
        image: "https://via.placeholder.com/400x500?text=Storage+Bins",
        description: "Playful storage solutions that add personality to any room.",
      },
      {
        id: 4,
        name: "Whimsical Table Lamp",
        price: 79.99,
        image: "https://via.placeholder.com/400x500?text=Table+Lamp",
        description: "A delightfully quirky lamp that brings joy and light to your space.",
      },
    ],
    ModernSleek: [
      {
        id: 1,
        name: "Minimalist Desk Lamp",
        price: 129.99,
        image: "https://via.placeholder.com/400x500?text=Desk+Lamp",
        description:
          "A sleek, adjustable desk lamp with LED technology and wireless charging base. Perfect for modern workspaces.",
      },
      {
        id: 2,
        name: "Geometric Wall Art",
        price: 89.0,
        image: "https://via.placeholder.com/400x500?text=Wall+Art",
        description:
          "Contemporary geometric wall art piece crafted from premium materials. Adds sophistication to any space.",
      },
      {
        id: 3,
        name: "Smart Storage System",
        price: 199.5,
        image: "https://via.placeholder.com/400x500?text=Storage+System",
        description:
          "Modular storage solution with clean lines and intelligent organization. Designed for modern living.",
      },
      {
        id: 4,
        name: "Premium Wireless Speaker",
        price: 249.0,
        image: "https://via.placeholder.com/400x500?text=Speaker",
        description: "High-fidelity wireless speaker with minimalist design and exceptional sound quality.",
      },
    ],
  }

  return defaultProducts[template] || []
}

export default router


