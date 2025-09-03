import VoucherUsage from "../models/VoucherUsage";

export const createUsage = async (req, res) => {
    const { idUser, idVoucher } = req.body;
    try {
        const findUsage = await VoucherUsage.findOne({ idUser, idVoucher });
        if (findUsage) return res.status(409).json({ error: 'Usage đã được tạo trước đó' });

        const newUsage = await VoucherUsage.create({ idUser, idVoucher });
        return res.status(201).json(newUsage);
    } catch (error) {
        console.log('Lỗi ở createUsage', error);
        return res.status(500).json({ error: 'Internal Server', message: error.message });
    }
}