import Cart from '../models/Cart';
import Product from '../models/Product';
import Variant from '../models/Variant';
import Voucher from '../models/Voucher';

export const getSingleCart = async (req, res) => {
    const { idUser } = req.query;
    try {
        const getCart = await Cart.findOne({ idUser })
            .populate({
                path: "products.product",
                model: "Product"
            })
            .populate({
                path: "products.variant",
                model: "Variant"
            });
        if (!getCart) {
            const newCart = await Cart.create({ idUser });
            return res.status(201).json(newCart);
        }

        let total = 0;

        total = getCart.products.reduce((acc, curr) => {
            return acc + ((curr.variant.price - curr.variant.discount) * curr.quantity);
        }, 0)

        const newCart = {
            ...getCart._doc,
            total
        }

        return res.status(200).json(newCart);

    } catch (error) {
        console.log('Lỗi ở getSingleCart', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

export const addToCart = async (req, res) => {
    const { idProduct, idVariant, idUser, quantity } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser });
        if (!getCart) {
            const newCart = await Cart.create({ idUser });

            newCart.products.push({ product: idProduct, variant: idVariant, quantity: quantity });
            await newCart.save();

            return res.status(200).json(newCart);
        }

        const findProduct = await Product.findOne({ _id: idProduct, isDelete: false, isHidden: false });
        if (!findProduct) return res.status(404).json({ error: 'Product not found' });

        const findVariant = await Variant.findOne({ _id: idVariant, isDelete: false });
        if (!findVariant) return res.status(404).json({ error: 'Variant not found' });

        //sp trùng lặp thì +1 số lượng
        const exitAdd = getCart.products.findIndex(item => item.product.toString() === idProduct.toString() && item.variant.toString() === idVariant.toString());
        if (exitAdd !== -1) {
            //Kiểm tra số lượng tồn kho
            if (getCart.products[exitAdd].quantity >= findVariant.countOnStock) return res.status(409).json({ error: 'Max count on stock' });
            getCart.products[exitAdd].quantity += quantity;
            await getCart.save();
            return res.status(200).json(getCart);
        }

        getCart.products.push({ product: idProduct, variant: idVariant, quantity: quantity });
        await getCart.save();

        return res.status(200).json(getCart);
    } catch (error) {
        console.log('Lỗi ở addToCart', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const increaseQuantity = async (req, res) => {
    const { idProduct, idVariant, idUser } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser });
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const index = getCart.products.findIndex(item => item.product.toString() === idProduct && item.variant.toString() === idVariant);
        if (index === -1) return res.status(404).json({ error: 'Cannot found index' });

        const findVariant = await Variant.findOne({ _id: idVariant, isDelete: false });
        if (!findVariant) return res.staus(404).json({ error: 'Variant not found' });

        if (getCart.products[index].quantity >= findVariant.countOnStock) return res.status(409).json({ error: 'Max count on stock' });

        getCart.products[index].quantity += 1;
        await getCart.save();

        return res.status(200).json(getCart.products[index]);
    } catch (error) {
        console.log('Lỗi ở increaseQuantity', error);
        return res.staus(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const decreaseQuantity = async (req, res) => {
    const { idProduct, idVariant, idUser } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser });
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const index = getCart.products.findIndex(item => item.product.toString() === idProduct && item.variant.toString() === idVariant);
        if (index === -1) return res.status(404).json({ error: 'Can not found index' });

        if (getCart.products[index].quantity === 1) {
            getCart.products = getCart.products.filter(item => item.variant.toString() !== idVariant.toString());
            await getCart.save();

            return res.status(200).json(getCart);
        }

        getCart.products[index].quantity -= 1;
        await getCart.save();

        return res.status(200).json(getCart);
    } catch (error) {
        console.log('Lỗi ở decreaseQuantity', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const updateQuantity = async (req, res) => {
    const { idProduct, idVariant, idUser, quantity } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser })
            .populate({
                path: "products.product",
                model: "Product"
            })
            .populate({
                path: "products.variant",
                model: "Variant"
            });
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const index = getCart.products.findIndex(item => item.product._id.toString() === idProduct && item.variant._id.toString() === idVariant);
        if (index === -1) return res.status(404).json({ error: 'Can not found index' });

        getCart.products[index].quantity = quantity;
        await getCart.save();

        // let total = 0;
        getCart.total = getCart.products.reduce((acc, curr) => {
            return acc + ((curr.variant.price - curr.variant.discount) * curr.quantity);
        }, 0)
        // getCart.total = total;
        await getCart.save();

        return res.status(200).json(getCart.products[index]);
    } catch (error) {
        console.log('Lỗi ở updateQuantity', error)
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const clearCart = async (req, res) => {
    const { idUser } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser });
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        getCart.totalProduct = 0;
        getCart.discountVoucher = 0;
        getCart.total = 0;
        getCart.products = [];
        await getCart.save();

        return res.status(200).json(getCart);
    } catch (error) {
        console.log('Lỗi ở clearCart', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const removeAProduct = async (req, res) => {
    const { idUser, idVariant } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser });
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const findIndex = getCart.products.findIndex(item => item.variant._id.toString() === idVariant);
        if (findIndex === -1) return res.status(404).json({ error: 'Can not found index' });

        getCart.products = getCart.products.filter((_, index) => index !== findIndex);
        await getCart.save();

        return res.status(200).json({ idVariant })
    } catch (error) {
        console.log('Lỗi ở removeAProduct', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

export const addVoucher = async (req, res) => {
    const { idUser, idVoucher, voucherCode } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser });
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const findVoucher = await Voucher.findOne({ _id: idVoucher }) || await Voucher.findOne({ voucherCode });
        if (!findVoucher) return res.staus(404).json({ error: 'Voucher not found' });

        //Check voucher đã có trong giỏ hàng chưa
        const findIndex = getCart.voucherUsage.findIndex(voucher => voucher === findVoucher._id);
        if (findIndex !== -1) return res.status(409).json({ error: 'Voucher đã được sử dụng' });

        if (findVoucher) {
            //Check trạng thái active
            if (findVoucher.isActive === false) return res.status(409).json({ error: 'Voucher chưa được kích hoạt' });
            //Check ngày bắt đầu và kết thúc
            const startDate = new Date(findVoucher.startDate);
            const endDate = new Date(findVoucher.endDate);
            const presentDate = new Date();
            if (presentDate < startDate) return res.status(409).json({ error: 'Voucher chưa đến ngày sử dụng' });
            if (presentDate > endDate) return res.status(409).json({ error: 'Voucher đã hết hạn sử dụng' });
            //Check người dùng này đã sử dụng voucher chưa
            const findUsage = await voucherUsage.findOne({ idUser, idVoucher });
            if (findUsage) return res.status(409).json({ error: 'Voucher đã qua sử dụng' });
        }

        getCart.voucherUsage.push(findVoucher._id);
        await getCart.save();

        return res.status(200).json(getCart);

    } catch (error) {
        console.log('Lỗi ở addVoucher', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}