import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: ''
    },
    shortDesc: {
        type: String,
        default: ''
    },
    productImage: {
        type: String,
        required: true,
        default: ''
    },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
    isDelete: {
        type: Boolean,
        default: false
    },
    isHidden: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Product', productSchema);