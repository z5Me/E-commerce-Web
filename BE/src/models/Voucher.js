import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    voucherCode: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    minBill: {
        type: Number,
        default: 0,
        required: true
    },
    maxDiscount: {
        type: Number,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
    discount: {
        type: Number,
        required: true
    },
    typeOfDiscount: {
        enum: ['percent', 'fixed'],
        default: 'fixed'
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: false
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('Voucher', voucherSchema);