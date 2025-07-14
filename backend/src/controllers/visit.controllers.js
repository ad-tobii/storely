import Visit from '../models/visit.models.js';
import Seller from '../models/seller.models.js';

// Session cookie configuration
const SESSION_COOKIE_NAME = 'storely_session_id';
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export const trackVisit = async (req, res) => {
    try {
        const { sellerId } = req.body;
        const customerId = req.user?._id; // May be undefined if not logged in

        // Check if a session cookie already exists
        const existingSession = req.cookies[SESSION_COOKIE_NAME];

        // If a session is already active for this user, do nothing.
        // This prevents creating a new "Visit" for every page refresh or navigation.
        if (existingSession) {
            return res.status(200).json({ message: "Session already active." });
        }

        // --- If no active session, this is a new visit ---

        // Verify the seller exists before tracking
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            // Don't set a cookie if the seller is invalid
            return res.status(404).json({ message: "Store not found" });
        }

        // Create the new Visit document in the database
        const newVisit = new Visit({
            seller: sellerId,
            customer: customerId,
        });
        await newVisit.save();

        // Set a new session cookie on the user's browser
        res.cookie(SESSION_COOKIE_NAME, newVisit._id.toString(), {
            maxAge: SESSION_DURATION_MS, // The cookie will expire in 30 minutes
            httpOnly: true, // Prevents client-side script access
            sameSite: 'strict', // Helps prevent CSRF
            // This is the key change: the cookie will only be sent over HTTPS in production
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(201).json({ message: "New visit tracked successfully." });

    } catch (error) {
        // Fail silently on the frontend, but log on the backend
        console.error("Visit tracking error:", error.message);
        res.status(500).json({ message: "Could not track visit" });
    }
};