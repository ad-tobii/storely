// --- START OF FILE /models/product.models.js ---

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: 0,
  },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: 0,
    default: 0,
  },
  category: {
    type: String,
    trim: true,
  },
  sku: {
    type: String,
    trim: true,
    unique: true,
    sparse: true, // Allows multiple null values but unique if present
  },
  images: [{
    type: String, // URLs to images
  }],
  status: {
    type: String,
    enum: ['active', 'hidden'],
    default: 'active',
  },
  // --- ADDED FOR REVIEWS ---
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  // -------------------------
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;