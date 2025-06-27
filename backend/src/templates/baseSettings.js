// --- START OF FILE baseSettings.js ---

import mongoose from "mongoose";

export const baseSettingsSchema = {
  // ✅ ADDED: Explicitly define the `images` field as a Map of strings.
  // This allows Mongoose to properly save image URLs.
  images: {
    type: Map,
    of: String,
    default: {},
  },

  // SEO Settings
  seoTitle: {
    type: String,
    default: "",
  },
  seoDescription: {
    type: String,
    default: "",
  },
  seoKeywords: {
    type: String,
    default: "",
  },

  // Social Media Links
  socialMedia: {
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
  },

  // Business Hours
  businessHours: {
    monday: {
      type: String,
      default: "9:00 AM - 6:00 PM",
    },
    tuesday: {
      type: String,
      default: "9:00 AM - 6:00 PM",
    },
    wednesday: {
      type: String,
      default: "9:00 AM - 6:00 PM",
    },
    thursday: {
      type: String,
      default: "9:00 AM - 6:00 PM",
    },
    friday: {
      type: String,
      default: "9:00 AM - 6:00 PM",
    },
    saturday: {
      type: String,
      default: "10:00 AM - 4:00 PM",
    },
    sunday: {
      type: String,
      default: "Closed",
    },
  },

  // Template Settings
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}

export const updateTimestamp = function (next) {
  this.updatedAt = Date.now()
  next()
}