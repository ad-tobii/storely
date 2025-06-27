import jwt from 'jsonwebtoken';
import Seller from '../models/seller.models.js';
import Customer from '../models/customer.models.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }

    const { userId, role } = decoded;

    let user; // Declare outside if-blocks

    if (role === 'seller') {
      user = await Seller.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    if (role === 'customer') {
      user = await Customer.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error in protectRoute middleware: ', error.message);
    res.status(500).json({ user, message: 'Server error in protectRoute' });
  }
};
