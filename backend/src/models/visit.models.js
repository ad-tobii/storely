import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false, // Can be anonymous
    },
    // The 'page' field is no longer needed for session-based tracking.
    // page: {
    //     type: String,
    //     required: true,
    // },
}, { timestamps: { createdAt: true, updatedAt: false } }); // Only care about creation time

const Visit = mongoose.model('Visit', visitSchema);
export default Visit;