import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'customer',
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: '',
  },
  otpExpiry: {
    type: Date,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;