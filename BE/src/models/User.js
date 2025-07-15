import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userNameFile: {
        type: String
    },
    userName: {
        type: String
    },
    address: {
        type: String
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: {
        type: String
    },
    phone: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', ''],
        default: ''
    },
    birthday: {
        type: Date
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

export default mongoose.model('User', userSchema);