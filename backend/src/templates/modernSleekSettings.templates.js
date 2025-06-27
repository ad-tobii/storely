// --- START OF FILE modernSleekSettings.templates.js ---

import mongoose from "mongoose"
import { baseSettingsSchema, updateTimestamp } from "./baseSettings.js"

const modernSleekSettingsSchema = new mongoose.Schema({
  // 🚨 REMOVED: storeName - Now lives on the Seller model.

  // Hero Section text is still editable
  heroTitle: {
    type: String,
    default: "Modern Design Excellence",
  },
  heroSubtitle: {
    type: String,
    default: "Minimalist aesthetics meet functional innovation",
  },

  // Brand Story and other text fields remain editable
  brandStory: {
    type: String,
    default:
      "We believe in the power of clean design and purposeful functionality. Our curated collection represents the intersection of modern aesthetics and timeless quality.",
  },
  brandPhilosophy: {
    type: String,
    default:
      "Every piece in our collection is carefully selected for its ability to enhance modern living through thoughtful design and exceptional craftsmanship.",
  },
  aboutTitle: { type: String, default: "About Modern Sleek" },
  aboutSubtitle: { type: String, default: "We curate exceptional design pieces that embody the principles of modern minimalism and functional beauty." },
  valuesTitle: { type: String, default: "Our Values" },
  value1Title: { type: String, default: "Quality" },
  value1Text: { type: String, default: "We believe in exceptional craftsmanship and materials that stand the test of time. Every piece is carefully selected for its superior quality and attention to detail." },
  value2Title: { type: String, default: "Innovation" },
  value2Text: { type: String, default: "We embrace cutting-edge design and technology to create products that push the boundaries of what's possible while maintaining timeless appeal." },
  value3Title: { type: String, default: "Sustainability" },
  value3Text: { type: String, default: "Environmental responsibility is at the core of our business. We partner with manufacturers who share our commitment to sustainable practices and materials." },
  contactTitle: { type: String, default: "Contact" },
  contactSubtitle: { type: String, default: "We value meaningful connections. Reach out to discuss your design needs or learn more about our collection." },
  newsletterTitle: { type: String, default: "Stay Updated" },
  newsletterText: { type: String, default: "Subscribe to receive updates on new collections and design insights." },
  faqTitle: { type: String, default: "Frequently Asked Questions" },
  faq1Question: { type: String, default: "Do you offer design consultation?" },
  faq1Answer: { type: String, default: "Yes, our design team offers personalized consultation services to help you create the perfect modern space." },
  faq2Question: { type: String, default: "What is your return policy?" },
  faq2Answer: { type: String, default: "We offer a 30-day return policy for all items in original condition. Custom orders are final sale." },

  // Color Settings
  themeColor: { type: String, default: "#1A1A2E" },
  secondaryColor: { type: String, default: "#16213E" },
  backgroundColor: { type: String, default: "#0F0F23" },
  primaryTextColor: { type: String, default: "#FFFFFF" },
  secondaryTextColor: { type: String, default: "#E2E2E2" },
  
  // 🚨 REMOVED: contactInfo - Now lives on the Seller model.

  // Include base schema fields
  ...baseSettingsSchema,
})

modernSleekSettingsSchema.pre("save", updateTimestamp)

export default mongoose.models.ModernSleekSettings || mongoose.model("ModernSleekSettings", modernSleekSettingsSchema)