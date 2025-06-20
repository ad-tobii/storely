// --- START OF FILE playfulColorfulSettings.templates.js ---

import mongoose from "mongoose"
import { baseSettingsSchema, updateTimestamp } from "./baseSettings.js"

const playfulColorfulSettingsSchema = new mongoose.Schema({
  // 🚨 REMOVED: storeName - Now lives on the Seller model.

  // Hero Section text is still editable
  heroTitle: {
    type: String,
    default: "Fun & Colorful Creations",
  },
  heroSubtitle: {
    type: String,
    default: "Brighten your world with our playful designs!",
  },

  // Brand Story and other text fields remain editable
  brandStory: {
    type: String,
    default:
      "We believe life should be full of color and joy! Our vibrant creations are designed to bring smiles and spark creativity in everyday moments.",
  },
  brandOrigin: {
    type: String,
    default:
      "It all began with a simple belief: life is too short for boring colors! We started in a tiny studio filled with paint splatters, glitter, and endless creativity. Today, we're proud to bring joy and color to thousands of homes around the world! 🎨✨",
  },
  aboutTitle: { type: String, default: "🌈 Our Colorful Story 🌈" },
  aboutSubtitle: { type: String, default: "We're on a mission to make the world a brighter, happier place - one colorful creation at a time!" },
  valuesTitle: { type: String, default: "✨ What We Believe In ✨" },
  value1Title: { type: String, default: "Creativity First" },
  value1Text: { type: String, default: "We believe everyone deserves to express their unique style and personality through vibrant, creative designs that spark joy and inspiration!" },
  value2Title: { type: String, default: "Planet Friendly" },
  value2Text: { type: String, default: "We're committed to protecting our beautiful, colorful planet! All our products are made with eco-friendly materials and sustainable practices." },
  value3Title: { type: String, default: "Spreading Joy" },
  value3Text: { type: String, default: "Our ultimate goal is simple: to make people smile! Every product we create is designed to bring happiness and positive vibes into your daily life." },
  contactTitle: { type: String, default: "💌 Let's Chat! 💌" },
  contactSubtitle: { type: String, default: "We absolutely LOVE hearing from you! Drop us a colorful message and we'll get back to you faster than you can say 'rainbow'! 🌈✨" },
  faqTitle: { type: String, default: "🤔 Colorful Questions & Answers 🤔" },
  faq1Question: { type: String, default: "🎨 Do you do custom colorful creations?" },
  faq1Answer: { type: String, default: "We LOVE creating custom pieces! Just tell us your wildest color dreams and we'll make them come true! ✨" },
  faq2Question: { type: String, default: "💝 What if I don't love my colorful purchase?" },
  faq2Answer: { type: String, default: "No worries! We have a 30-day happiness guarantee! If it doesn't make you smile, we'll make it right! 😊" },
  newsletterTitle: { type: String, default: "Join Our Colorful Community!" },
  newsletterText: { type: String, default: "Get the latest updates on new products, special offers, and daily doses of color inspiration!" },
  
  // Color Settings
  themeColor: { type: String, default: "#FF6B6B" },
  secondaryColor: { type: String, default: "#4ECDC4" },
  backgroundColor: { type: String, default: "#FFF9F9" },
  primaryTextColor: { type: String, default: "#292F36" },
  secondaryTextColor: { type: String, default: "#555555" },

  // 🚨 REMOVED: contactInfo - Now lives on the Seller model.

  // Include base schema fields
  ...baseSettingsSchema,
})

playfulColorfulSettingsSchema.pre("save", updateTimestamp)

export default mongoose.models.PlayfulColorfulSettings ||
  mongoose.model("PlayfulColorfulSettings", playfulColorfulSettingsSchema)