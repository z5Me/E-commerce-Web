import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

categorySchema.pre('save', function (next) {
    // Chỉ tạo slug khi slug chưa được set
    if (!this.slug || this.slug.trim() === '') {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

export default mongoose.model('Categories', categorySchema);