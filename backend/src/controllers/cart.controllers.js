import Product from '../models/product.models.js';

// This controller assumes the `protectRoute` middleware has already run.
// If it fails, the middleware will send a 401 and this code won't execute.

export const checkAndFetchCartData = async (req, res) => {
    // The user's role is checked by the middleware. Here we can add an extra layer.
    if (req.user.role !== 'customer') {
        return res.status(403).json({ message: "Forbidden: Only customers can access the cart." });
    }

    // Since the middleware passed, we know the user is authenticated.
    // We can now proceed to fetch any necessary data for the cart page.
    // For now, we just confirm access. In a real scenario, you might fetch
    // saved cart items from the database here.

    res.status(200).json({ 
        message: "Access granted.",
        user: { // Send back some user info if needed
            id: req.user._id,
            fullname: req.user.fullname,
            email: req.user.email
        }
    });
};