// This controller's only job is to send a success response.
// The `protectCustomerRoute` middleware does all the important verification work.
// If the request reaches this function, we know the user is an authenticated customer.
export const checkCartAccess = async (req, res) => {
    res.status(200).json({ 
        message: "Access granted. User is a verified customer.",
        user: { // Send back user info just in case the frontend needs it
            id: req.user._id,
            fullname: req.user.fullname,
            email: req.user.email
        }
    });
};