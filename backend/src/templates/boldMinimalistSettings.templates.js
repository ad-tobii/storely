// --- START OF FILE boldMinimalistSettings.templates.js ---

import mongoose from "mongoose"
import { baseSettingsSchema, updateTimestamp } from "./baseSettings.js"

const boldMinimalistSettingsSchema = new mongoose.Schema({
  // 🚨 REMOVED: storeName - Now lives on the Seller model.

  // Hero Section text is still editable
  heroTitle: {
    type: String,
    default: "BOLD. MINIMAL. ESSENTIAL.",
  },
  heroSubtitle: {
    type: String,
    default: "UNCOMPROMISING DESIGN FOR THE MODERN WORLD",
  },

  // Brand Story and other text fields remain editable
  brandStory: {
    type: String,
    default:
      "WE STRIP AWAY THE UNNECESSARY TO REVEAL WHAT TRULY MATTERS. OUR PHILOSOPHY IS SIMPLE: BOLD STATEMENTS THROUGH MINIMAL MEANS.",
  },
  philosophyExtra: {
    type: String,
    default: "EVERY ELEMENT SERVES A PURPOSE. EVERY LINE HAS MEANING. EVERY SPACE SPEAKS VOLUMES.",
  },
  aboutTitle: { type: String, default: "ABOUT US" },
  aboutSubtitle: { type: String, default: "DEFINING BOLD. EMBRACING MINIMAL. CREATING ESSENTIAL." },
  missionTitle: { type: String, default: "MISSION" },
  missionText: { type: String, default: "TO STRIP AWAY THE UNNECESSARY AND REVEAL THE ESSENTIAL. WE BELIEVE THAT TRUE BEAUTY LIES IN SIMPLICITY, AND THAT EVERY ELEMENT SHOULD SERVE A PURPOSE." },
  valuesTitle: { type: String, default: "VALUES" },
  value1Title: { type: String, default: "PRECISION" },
  value1Text: { type: String, default: "EVERY LINE, EVERY ANGLE, EVERY DECISION IS DELIBERATE AND PURPOSEFUL." },
  value2Title: { type: String, default: "EXCELLENCE" },
  value2Text: { type: String, default: "WE ACCEPT NOTHING LESS THAN PERFECTION IN DESIGN AND EXECUTION." },
  value3Title: { type: String, default: "IMPACT" },
  value3Text: { type: String, default: "OUR DESIGNS INFLUENCE HOW PEOPLE LIVE, WORK, AND THINK." },
  contactTitle: { type: String, default: "CONTACT" },
  contactSubtitle: { type: String, default: "DIRECT COMMUNICATION. NO UNNECESSARY WORDS. PURE INTENTION." },
  faqTitle: { type: String, default: "FREQUENTLY ASKED" },
  faq1Question: { type: String, default: "DO YOU OFFER CUSTOM DESIGN?" },
  faq1Answer: { type: String, default: "YES. WE CREATE BESPOKE PIECES THAT EMBODY OUR MINIMALIST PHILOSOPHY WHILE MEETING YOUR SPECIFIC REQUIREMENTS." },
  faq2Question: { type: String, default: "WHAT IS YOUR RETURN POLICY?" },
  faq2Answer: { type: String, default: "30-DAY RETURN POLICY FOR ALL ITEMS IN ORIGINAL CONDITION. CUSTOM PIECES ARE FINAL SALE." },
  newsletterTitle: { type: String, default: "STAY BOLD" },
  newsletterText: { type: String, default: "GET UPDATES ON NEW ESSENTIAL PRODUCTS AND BOLD DESIGN INSIGHTS" },

  // Color Settings
  themeColor: { type: String, default: "#000000" },
  secondaryColor: { type: String, default: "#FFFFFF" },
  backgroundColor: { type: String, default: "#F8F8F8" },
  primaryTextColor: { type: String, default: "#000000" },
  secondaryTextColor: { type: String, default: "#555555" },
  
  // 🚨 REMOVED: contactInfo - Now lives on the Seller model.

  // Include base schema fields
  ...baseSettingsSchema,
})

boldMinimalistSettingsSchema.pre("save", updateTimestamp)

export default mongoose.models.BoldMinimalistSettings ||
  mongoose.model("BoldMinimalistSettings", boldMinimalistSettingsSchema)