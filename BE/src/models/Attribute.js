import mongoose from "mongoose";
import slugify from 'slugify';

const AttributeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    slug: {
        type: String,
        lower: true,
        strict: true
    },
    type: {
        type: String
    },
    terms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue' }],
    value: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue' }],
    isDelete: {
        type: Boolean,
        default: false
    }
})

AttributeSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true })
    }
    next()
})

export default mongoose.model('Attribute', AttributeSchema);