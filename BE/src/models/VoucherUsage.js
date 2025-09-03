import mongoose from "mongoose";

const voucherUsageSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    idVoucher: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('VoucherUsage', voucherUsageSchema);