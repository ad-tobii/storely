import mongoose from 'mongoose';

const productViewSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false, // Can be an anonymous view
    },
}, { timestamps: { createdAt: true, updatedAt: false } });

// Add indexes for faster querying
productViewSchema.index({ seller: 1, createdAt: -1 });
productViewSchema.index({ product: 1 });

const ProductView = mongoose.model('ProductView', productViewSchema);
export default ProductView;