import Seller from '../models/seller.models.js';
import Customer from '../models/customer.models.js';
import bcrypt from 'bcryptjs';
import { generateToken, sendEmail, generateOtp } from '../lib/utils.js';
import crypto from 'crypto';

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, role, storename } = req.body;
    console.log(req.body);
    if (!fullname || !email || !password || !role) {
      console.log(req.body);
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be atleast 6 characters' });
    }

    if (role === 'seller') {
      const seller = await Seller.findOne({ email });
      if (seller) {
        return res
          .status(400)
          .json({ message: 'Email already in use by seller' });
      }
      if (!storename) {
        return res.status(400).json({ message: 'Store name is required' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newSeller = new Seller({
        fullname,
        storename,
        email,
        password: hashedPassword,
        role,
      });

      if (newSeller) {
        await newSeller.save();
        const user  = {
          storename: newSeller.storename,
          fullname: newSeller.fullname,
          email: newSeller.email,
          role: newSeller.role,
        };
console.log(user);
        console.log("the newly created user", user);
        res.status(201).json({
        user
        });
      } else {
        return res.status(400).json({ message: 'Invalid seller data' });
      }
    }
    if (role === 'customer') {
      const customer = await Customer.findOne({ email });
      if (customer) {
        return res
          .status(400)
          .json({ message: 'Email already in use by customer' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newCustomer = new Customer({
        fullname,
        email,
        password: hashedPassword,
      });

      if (newCustomer) {
        await newCustomer.save();

        res.status(201).json({
          user: {
            fullname: newCustomer.fullname,
            email: newCustomer.email,
            role: newCustomer.role,
          },
        });
      } else {
        return res.status(400).json({ message: 'Invalid customer data' });
      }
    }
  } catch (error) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ message: 'Internal server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email, role } = req.body;
    if (!password || !email || !role) {
      return res.status(400).json({ message: ' All fields required' });
    }

    if (role === 'seller') {
      const seller = await Seller.findOne({ email });
      if (!seller) {
        return res.status(400).json({ message: 'Seller account not found' });
      }
      if (!seller.isVerified) {
        return res.status(400).json({
          message: 'Seller account not verified',
          email: seller.email,
          role: seller.role,
          unverified: true,
        });
      }
      const isPasswordCorrect = await bcrypt.compare(password, seller.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      generateToken(seller._id, role, res);
      res.status(201).json({
        user: {
          _id: seller._id,
          fullname: seller.fullname,
          email: seller.email,
        },
      });
    }

    if (role === 'customer') {
      const customer = await Customer.findOne({ email });
      if (!customer) {
        return res.status(400).json({ message: 'Customer account not found' });
      }

      if (!customer.isVerified) {
        return res.status(400).json({
          message: 'Customer account not verified',
          email: customer.email,
          role: customer.role,
          unverified: true,
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        customer.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      generateToken(customer._id, role, res);
      res.status(201).json({
        user: {
          _id: customer._id,
          fullname: customer.fullname,
          email: customer.email,
        },
      });
    }
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const getOtp = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const { gen_otp, fullname } = await generateOtp(email, role);
    const message = ` Hi ${fullname}, welcome to storely 🍾🍾, your OTP for your ${role} account is ${gen_otp}`;
    const subject = 'OTP for account verification';
    sendEmail({ email, message, subject });
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.log('Error in getOtp controller', error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, role } = req.body;
    if (role !== 'seller' && role !== 'customer') {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!email || !otp || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const enteredOtp = crypto.createHash('sha256').update(otp).digest('hex');
    if (role === 'seller') {
      const seller = await Seller.findOne({ email });
      if (!seller) {
        return res.status(400).json({ message: 'Seller account not found' });
      }
      if (seller.otpExpiry < Date.now()) {
        return res.status(400).json({ message: 'OTP expired' });
      }
      if (seller.otp !== enteredOtp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      seller.isVerified = true;
      seller.otp = undefined;
      seller.otpExpiry = undefined;

      await seller.save();
      generateToken(seller._id, role, res);

      res.status(200).json({ message: 'Seller account verified successfully' });
    }
    if (role === 'customer') {
      const customer = await Customer.findOne({ email });
      if (!customer) {
        return res.status(400).json({ message: 'Customer account not found' });
      }
      if (customer.otpExpiry < Date.now()) {
        return res.status(400).json({ message: 'OTP expired' });
      }
      if (customer.otp !== enteredOtp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      customer.isVerified = true;
      customer.otp = undefined;
      customer.otpExpiry = undefined;
      await customer.save();
      generateToken(customer._id, role, res);

      res
        .status(200)
        .json({ message: 'Customer account verified successfully' });
    }
  } catch (error) {
    console.log('Error in verifyOtp controller', error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

// controllers/auth.controller.js
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
