import mongoose from "mongoose";
import slugify from 'slugify';

const AttributeValueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lower: true,
        strict: true
    },
    type: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    },
})

AttributeValueSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
})

export default mongoose.model('AttributeValue', AttributeValueSchema)