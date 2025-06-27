// backend/routes/review.routes.js
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createReview, getProductReviews, checkReviewEligibility } from '../controllers/review.controllers.js';

const router = express.Router();

// GET all reviews for a specific product (public)
router.get('/:productId', getProductReviews);

// POST a new review for a product (protected, customer only)
router.post('/:productId', protectRoute, createReview);

// GET check if a logged-in user can review a product
router.get('/eligibility/:productId', protectRoute, checkReviewEligibility);

export default router;