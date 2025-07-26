import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
    sku: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0,
    },
    typeDiscount: {
        type: String,
        enum: ['percent', 'fixed'],
        default: 'fixed'
    },
    discount: {
        type: Number,
        default: 0
    },
    countOnStock: {
        type: Number,
        default: 0
    },
    values: [],
    image: {
        type: String,
        default: ''
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Variant', VariantSchema);