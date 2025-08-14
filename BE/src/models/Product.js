import mongoose from "mongoose";
import slugify from 'slugify';

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
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
    slug: {
        type: String,
        lower: true,
        strict: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isHidden: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

productSchema.pre('save', function (next) {
    // Chỉ tạo slug khi slug chưa được set
    if (!this.slug || this.slug.trim() === '') {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

export default mongoose.model('Product', productSchema);