import jwt from 'jsonwebtoken';
import Customer from '../models/customer.models.js';

/**
 * Middleware to protect routes that should only be accessible to authenticated customers.
 * It first verifies the JWT token and then ensures the user's role is 'customer'.
 */
export const protectCustomerRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    }

    const { userId, role } = decoded;

    // --- Core Improvement: Role-specific check ---
    if (role !== 'customer') {
        return res.status(403).json({ message: 'Forbidden: Access restricted to customers.' });
    }

    const customer = await Customer.findById(userId).select('-password');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    req.user = customer; // Attach the validated customer to the request object
    next();

  } catch (error) {
    console.log('Error in protectCustomerRoute middleware: ', error.message);
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Unauthorized: Malformed Token' });
    }
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized: Token Expired' });
    }
    // Generic server error
    res.status(500).json({ message: 'Server error in customer protection route' });
  }
};