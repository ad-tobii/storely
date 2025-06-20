// backend/controllers/onboarding.controllers.js

import Seller from '../models/seller.models.js';
// Make sure to import the settings model you want to use as the default
import ArtisanElegantSettings from '../templates/ArtisanElegantSettings.templates.js';

/**
 * Controller to handle the final submission of the seller onboarding form.
 * This function processes text data and file uploads (logo, hero image),
 * updates the seller's profile, and marks onboarding as complete.
 */
export const completeOnboarding = async (req, res) => {
  console.log('=== ONBOARDING CONTROLLER: REQUEST RECEIVED ===');

  try {
    const sellerId = req.user._id;

    if (!sellerId) {
      return res.status(401).json({ message: 'Unauthorized - No seller ID found' });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found." });
    }
    
    // --- 1. Parse and Validate Text-Based Form Data from req.body ---
    const { storeDescription, returnPolicy, storePolicy } = req.body;
    let storeCategories, shippingDestinations, shippingRates, bankDetails, socialLinks, contactInfo;

    try {
      storeCategories = req.body.storeCategories ? JSON.parse(req.body.storeCategories) : [];
      shippingDestinations = req.body.shippingDestinations ? JSON.parse(req.body.shippingDestinations) : [];
      shippingRates = req.body.shippingRates ? JSON.parse(req.body.shippingRates) : {};
      bankDetails = req.body.bankDetails ? JSON.parse(req.body.bankDetails) : {};
      socialLinks = req.body.socialLinks ? JSON.parse(req.body.socialLinks) : {};
      contactInfo = req.body.contact ? JSON.parse(req.body.contact) : {};
    } catch (parseError) {
      console.error('ERROR: Failed to parse form data:', parseError);
      return res.status(400).json({ message: 'Invalid data format in request body' });
    }
    
    // --- 2. Correctly Handle Image URLs from req.files ---
    // The `upload.fields` middleware populates `req.files` after uploading to Cloudinary.
    // We extract the `path` which contains the final URL.
    if (req.files?.storeLogo?.[0]) {
      seller.storeLogoUrl = req.files.storeLogo[0].path;
      console.log('SUCCESS: Store logo URL saved:', seller.storeLogoUrl);
    }
    if (req.files?.storeHeroImage?.[0]) {
      seller.heroImageUrl = req.files.storeHeroImage[0].path;
      console.log('SUCCESS: Hero image URL saved:', seller.heroImageUrl);
    }

    // --- 3. Create and Assign Default Template if it Doesn't Exist ---
    if (!seller.storeSettingsRef) {
        console.log("No existing settings found. Creating default 'ArtisanElegant' template for seller.");
        
        // Create a new settings document for the ArtisanElegant template
        const newSettings = new ArtisanElegantSettings({});
        await newSettings.save();

        // Assign the new settings and template info to the seller
        seller.template = 'ArtisanElegant';
        seller.storeSettingsModel = 'ArtisanElegantSettings'; // The name of the Mongoose model
        seller.storeSettingsRef = newSettings._id; // The ID of the new settings document
        
        console.log(`SUCCESS: Assigned template 'ArtisanElegant' with settings ID: ${newSettings._id}`);
    }
    
    // --- 4. Update Seller Document with All Onboarding Data ---
    seller.storeDescription = storeDescription;
    seller.storeCategories = storeCategories;
    seller.shippingDestinations = shippingDestinations;
    seller.returnPolicy = returnPolicy;
    seller.shippingRates = {
        standard: Number(shippingRates.standard) || 0,
        express: Number(shippingRates.express) || 0,
    };
    seller.bankDetails = bankDetails;
    seller.storePolicy = storePolicy;
    seller.socialLinks = socialLinks;
    seller.contactInfo = contactInfo;
    seller.onboardingCompleted = true;

    // Save all changes to the seller document at once
    const updatedSeller = await seller.save();
    
    console.log('SUCCESS: Onboarding completed for seller:', updatedSeller._id);

    res.status(200).json({
      message: 'Onboarding completed successfully!',
      seller: updatedSeller,
    });

  } catch (error) {
    console.error('=== ONBOARDING CONTROLLER CRITICAL ERROR ===');
    console.error('Error:', error.message);
    res.status(500).json({
      message: "An internal server error occurred during onboarding.",
      error: error.message,
    });
  }
};


export const getOnboardingStatus = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const seller = await Seller.findById(sellerId).select('onboardingCompleted');

    if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({
      onboardingCompleted: seller.onboardingCompleted,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get onboarding status',
    });
  }
};