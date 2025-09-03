import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        variant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variant'
        },
        quantity: {
            type: Number,
        }
    }],
    totalProduct: {
        type: Number,
        default: 0
    },
    discountVoucher: {
        type: Number,
        default: 0
    },
    voucherUsage: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Voucher'
        }
    ],
    address: {},
    total: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model('Cart', cartSchema)