import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected : success');
  } catch (error) {
    console.log('MongoDB connection error', error);
  }
};
