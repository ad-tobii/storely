import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import otpGenerator from 'otp-generator';
import crypto from 'crypto';
import Seller from '../models/seller.models.js';
import Customer from '../models/customer.models.js';
import nodemailer from 'nodemailer';

dotenv.config();

export const generateToken = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  return token;
};

export const generateOtp = async (email, role) => {
  try {
    const gen_otp = otpGenerator.generate(5, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    const hashedOtp = crypto.createHash('sha256').update(gen_otp).digest('hex');
    const otpExpiry = Date.now() + 5 * 60 * 1000;
    if (role === 'seller') {
      const seller = await Seller.findOne({ email });
      if (!seller) {
        throw new Error('Seller account not found');
      }
      const fullname = seller.fullname;
      seller.otp = hashedOtp;
      seller.otpExpiry = otpExpiry;
      await seller.save();
      return { gen_otp, fullname };
    }
    if (role === 'customer') {
      const customer = await Customer.findOne({ email });
      if (!customer) {
        throw new Error('Customer account not found');
      }
      const fullname = customer.fullname;
      customer.otp = hashedOtp;
      customer.otpExpiry = otpExpiry;
      await customer.save();
      return { gen_otp, fullname };
    }
  } catch (error) {
    console.log('Error in generateOtp', error.message);
    throw new Error('Internal server error');
  }
};


// ✅ ADD LOGGING TO YOUR EMAIL FUNCTION
export const sendEmail = async ({ email, message, subject }) => {
  // 🔴 VERY IMPORTANT: Log to check if your environment variables are loaded.
  console.log(`[sendEmail] Preparing to send email. ZMAIL_USER: ${process.env.ZMAIL_USER ? 'Loaded' : 'NOT LOADED'}`);

  if (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS) {
      console.error("[sendEmail] ERROR: Zoho mail credentials are not set in .env file.");
      return; // Stop execution if credentials are not found
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Storely" <${process.env.ZMAIL_USER}>`, // Use a better "from" name
      to: email,
      subject: subject,
      text: message, // You can also add an `html` property for styled emails
    };
    
    console.log(`[sendEmail] Sending email with options:`, { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject });
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent ✅ Message ID:', info.messageId);

  } catch (error) {
    console.error('Error sending email ❌', error);
  }
};