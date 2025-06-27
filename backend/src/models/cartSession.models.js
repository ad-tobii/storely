import mongoose from 'mongoose';

const cartSessionSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false, // For guest checkouts
    },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
        _id: false
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['initiated', 'completed'],
        default: 'initiated',
    },
    // This TTL index will automatically delete documents after 90 days
    sessionExpiresAt: {
        type: Date,
        default: Date.now,
        expires: '90d',
    },
}, { timestamps: true });

// Add index for faster analytics queries
cartSessionSchema.index({ seller: 1, status: 1, createdAt: -1 });

const CartSession = mongoose.model('CartSession', cartSessionSchema);
export default CartSession;