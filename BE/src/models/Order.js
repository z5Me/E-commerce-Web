import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    receiver: {
        type: String
    },
    phone: {
        type: String
    },
    addressName: {
        type: String,
    },
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    selected: {
        type: Boolean,
        default: false
    }
});

const OrderShcema = new mongoose.Schema({
    orderCode: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: addressSchema,
    products: [Object],
    payment: {
        type: String,
        enum: ['cod', 'momo'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipping', 'complete', 'cancel'],
        default: 'pending'
    },
    totalProduct: {
        type: Number,
        default: 0
    },
    discountProduct: {
        type: Number,
        default: 0
    },
    discountVoucher: {
        type: Number,
        default: 0
    },
    shippingFee: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    updateStatus: [Object]
}, { timestamps: true });

export default mongoose.model('Order', OrderShcema);