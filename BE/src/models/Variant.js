import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
    price: {
        type: Number,
        default: 0,
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    discountPercent: {
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