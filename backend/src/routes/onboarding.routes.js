// backend/routes/onboarding.routes.js

import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';
import {
  completeOnboarding,
  getOnboardingStatus,
} from '../controllers/onboarding.controllers.js';

const router = express.Router();

// ✅ NEW: A temporary debugging middleware to inspect the request AFTER multer runs.
const debugAfterUpload = (req, res, next) => {
  console.log('--- DEBUGGING MIDDLEWARE: AFTER MULTER ---');
  console.log('Request Body (text fields):', req.body);
  
  if (req.files) {
    console.log('SUCCESS: `req.files` object IS PRESENT.');
    console.log(JSON.stringify(req.files, null, 2));
  } else {
    console.error('FAILURE: `req.files` object is MISSING. Multer likely failed.');
  }
  console.log('------------------------------------------');
  next(); // IMPORTANT: Pass control to the next middleware/controller
};


// @route   GET /api/onboarding
// @desc    Get the onboarding status for the logged-in seller
// @access  Private
router.get('/', protectRoute, getOnboardingStatus);

// @route   POST /api/onboarding
// @desc    Submit the seller's onboarding form data and files
// @access  Private
router.post(
  '/',
  protectRoute,
  // 1. Multer middleware runs first to handle the file upload.
  upload.fields([
    { name: 'storeLogo', maxCount: 1 },
    { name: 'storeHeroImage', maxCount: 1 },
  ]),
  // 2. Our new debugging middleware runs second to check the result.
  debugAfterUpload,
  // 3. The main controller runs last.
  completeOnboarding
);

export default router;