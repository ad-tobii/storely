// backend/models/review.model.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxLength: 1000 },
}, { timestamps: true });

// Prevent a customer from reviewing the same product more than once
reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;