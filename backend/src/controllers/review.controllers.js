// backend/controllers/review.controllers.js
import Review from '../models/review.models.js';
import Product from '../models/product.models.js';
import Order from '../models/order.models.js';

// Controller to create a new review
export const createReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const customerId = req.user._id;
        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ message: "Rating and comment are required." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Check if customer has purchased this product
        const hasPurchased = await Order.findOne({
            customer: customerId,
            'products.product': productId
        });

        if (!hasPurchased) {
            return res.status(403).json({ message: "You can only review products you have purchased." });
        }
        
        // Check if customer already reviewed this product
        const existingReview = await Review.findOne({ product: productId, customer: customerId });
        if (existingReview) {
            return res.status(409).json({ message: "You have already reviewed this product." });
        }

        const newReview = new Review({
            seller: product.seller,
            product: productId,
            customer: customerId,
            rating,
            comment,
        });

        await newReview.save();
        
        // Update product with new review and recalculate average rating
        const reviews = await Review.find({ product: productId });
        const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
        product.averageRating = totalRating / reviews.length;
        product.reviews.push(newReview._id);
        await product.save();

        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review:", error.message);
        res.status(500).json({ message: "Server error while creating review." });
    }
};

// Controller to get all reviews for a product
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product: productId })
            .populate('customer', 'fullname')
            .sort({ createdAt: -1 });
            
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching reviews." });
    }
};

// Controller to check if a customer can review a product
export const checkReviewEligibility = async (req, res) => {
    try {
        const { productId } = req.params;
        const customerId = req.user._id;

        const hasPurchased = await Order.findOne({ customer: customerId, 'products.product': productId });
        const hasReviewed = await Review.findOne({ product: productId, customer: customerId });

        res.status(200).json({ canReview: !!hasPurchased && !hasReviewed });
    } catch (error) {
        res.status(500).json({ message: "Server error checking eligibility." });
    }
};