import mongoose from 'mongoose';

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

const userSchema = new mongoose.Schema({
    userNameFile: {
        type: String
    },
    userName: {
        type: String
    },
    address: [addressSchema],
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: {
        type: String
    },
    phone: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', ''],
        default: ''
    },
    birthday: {
        type: Date,
        default: new Date()
    },
    password: {
        type: String,
        required: true
    },
    wishList: {
        type: Array
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

export default mongoose.model('User', userSchema);