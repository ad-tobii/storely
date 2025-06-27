// backend/models/emailList.model.js
import mongoose from 'mongoose';

const emailListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
        index: true,
    },
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    }],
}, { timestamps: true });

const EmailList = mongoose.model('EmailList', emailListSchema);
export default EmailList;