import Voucher from "../models/Voucher";

export const validateVoucher = async (req, res, next) => {
    const { idVoucher } = req.body;
    try {
        //Tìm và gọi lấy voucher
        const findVoucher = await Voucher.findOne({ _id: idVoucher }) || await Voucher.findOne({ voucherCode });
        if (!findVoucher) return res.staus(404).json({ error: 'Voucher not found' });

    } catch (error) {
        console.log('Lỗi ở validateVoucher', error);
        return res.status(500).json({ error: 'Internal server', message: error.message });
    }
}

export const cartFirstCheck = async (req, res, next) => {
    const { idUser } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser }).populate([
            {
                path: 'products.product',
                model: 'Product'
            },
            {
                path: 'products.variant',
                model: 'Variant'
            },
            {
                path: 'voucherUsage',
                model: 'Voucher'
            }
        ]);
        if (!getCart) {
            let newCart = await Cart.create({ idUser });
            const { allData } = caculateTotalCart(newCart);
            return res.status(201).json(allData);
        }

        req.cart = cart;
        next();
    } catch (error) {
        console.log('Lỗi ở cartFirstCheck', error);
        return res.staus(500).json({ error: 'Internal server', message: error.message });
    }
}