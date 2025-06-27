// --- START OF FILE artisanElegantSettings.templates.js ---

import mongoose from "mongoose"
import { baseSettingsSchema, updateTimestamp } from "./baseSettings.js"

const artisanElegantSettingsSchema = new mongoose.Schema({
  // 🚨 REMOVED: storeName - Now lives on the Seller model.

  // Hero Section text is still editable
  heroTitle: {
    type: String,
    default: "Artisan Crafted Goods",
  },
  heroSubtitle: {
    type: String,
    default: "Handmade with love and attention to detail",
  },
  
  // All other text fields remain editable as they are template-specific content
  brandStory: {
    type: String,
    default:
      "Our journey began in a small workshop, crafting pieces that tell stories. Each item is thoughtfully designed and meticulously created by skilled artisans who pour their heart into every detail.",
  },
  brandMission: {
    type: String,
    default:
      "We believe in the beauty of imperfection and the uniqueness that comes from handcrafted goods. Our mission is to preserve traditional craftsmanship while bringing timeless, functional art into modern homes.",
  },
  aboutTitle: { type: String, default: "Our Story" },
  aboutSubtitle: { type: String, default: "Discover the passion and craftsmanship behind our artisanal creations." },
  // ... and so on for all other editable text fields.

  // Color Settings
  themeColor: { type: String, default: "#8B5A2B" },
  secondaryColor: { type: String, default: "#D2B48C" },
  backgroundColor: { type: String, default: "#FAF7F2" },
  primaryTextColor: { type: String, default: "#333333" },
  secondaryTextColor: { type: String, default: "#666666" },

  // 🚨 REMOVED: contactInfo - Now lives on the Seller model.

  // Include base schema fields
  ...baseSettingsSchema,
})

artisanElegantSettingsSchema.pre("save", updateTimestamp)

export default mongoose.models.ArtisanElegantSettings ||
  mongoose.model("ArtisanElegantSettings", artisanElegantSettingsSchema)