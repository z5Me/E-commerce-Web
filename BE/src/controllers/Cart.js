import Cart from '../models/Cart';
import Product from '../models/Product';
import Variant from '../models/Variant';
import Voucher from '../models/Voucher';
import VoucherUsage from '../models/VoucherUsage';
import { caculateTotalCart, caculateTotalProduct, calculateShippingFeeKm, haversineDistanceKm } from '../utils/helperCart';

const originLat = process.env.ORIGIN_LAT;
const originLng = process.env.ORIGIN_LNG;

export const getSingleCart = async (req, res) => {
    const { idUser } = req.query;
    try {
        let getCart = await Cart.findOne({ idUser })
            .populate({
                path: "products.product",
                model: "Product"
            })
            .populate({
                path: "products.variant",
                model: "Variant"
            })
            .populate({
                path: "voucherUsage",
                model: "Voucher"
            });
        if (!getCart) {
            let newCart = await Cart.create({ idUser });
            const { allData } = caculateTotalCart(newCart);
            return res.status(201).json(allData);
        }

        const { allData } = caculateTotalCart(getCart);
        return res.status(200).json(allData);
    } catch (error) {
        console.log('Lỗi ở getSingleCart', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

export const addToCart = async (req, res) => {
    const { idProduct, idVariant, idUser, quantity } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser }).populate([
            { path: 'products.product' },
            { path: 'products.variant' },
            { path: 'voucherUsage' }
        ]);
        if (!getCart) {
            const newCart = await Cart.create({ idUser });

            newCart.products.push({ product: idProduct, variant: idVariant, quantity: quantity });
            await newCart.save();
            await newCart.populate([
                { path: 'products.product' },
                { path: 'products.variant' }
            ])

            return res.status(201).json(newCart);
        }

        const findProduct = await Product.findOne({ _id: idProduct, isDelete: false, isHidden: false });
        if (!findProduct) return res.status(404).json({ error: 'Product not found' });

        const findVariant = await Variant.findOne({ _id: idVariant, isDelete: false });
        if (!findVariant) return res.status(404).json({ error: 'Variant not found' });

        //sp trùng lặp thì +1 số lượng
        const exitAdd = getCart.products.findIndex(item => item.product._id.toString() === idProduct.toString() && item.variant._id.toString() === idVariant.toString());
        if (exitAdd !== -1) {
            //Kiểm tra số lượng tồn kho
            if (getCart.products[exitAdd].quantity >= findVariant.countOnStock || getCart.products[exitAdd].quantity + quantity > findVariant.countOnStock) return res.status(409).json({ error: 'Max count on stock' });
            getCart.products[exitAdd].quantity += quantity;
            await getCart.save();
            const { totalProduct, discountProduct, discountVoucher, total } = caculateTotalCart(getCart);
            const newCart = {
                product: getCart.products[exitAdd].product,
                variant: getCart.products[exitAdd].variant,
                quantity: getCart.products[exitAdd].quantity,
                totalProduct,
                discountProduct,
                discountVoucher,
                total
            }
            return res.status(200).json(newCart);
        }

        //add sp mới không bị trùng lặp
        getCart.products.push({ product: idProduct, variant: idVariant, quantity: quantity });
        await getCart.save(); //lưu dữ liệu vào Database
        //Xử lý dữ liệu trả về FE
        await getCart.populate([
            { path: 'products.product' },
            { path: 'products.variant' },
            { path: 'voucherUsage' }
        ])

        const findIndex = getCart.products.findIndex(item => item.product._id.toString() === idProduct.toString() && item.variant._id.toString() === idVariant.toString())
        const { totalProduct, discountProduct, discountVoucher, total } = caculateTotalCart(getCart);
        const newCart = {
            product: getCart.products[findIndex].product,
            variant: getCart.products[findIndex].variant,
            quantity,
            totalProduct,
            discountProduct,
            discountVoucher,
            total
        }

        return res.status(200).json(newCart);
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
        if (!findVariant) return res.status(404).json({ error: 'Variant not found' });

        if (getCart.products[index].quantity >= findVariant.countOnStock) return res.status(409).json({ error: 'Max count on stock' });

        getCart.products[index].quantity += 1;
        await getCart.save();

        return res.status(200).json(getCart.products[index]);
    } catch (error) {
        console.log('Lỗi ở increaseQuantity', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
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
        const getCart = await Cart.findOne({ idUser }).populate([
            {
                path: "products.product",
                model: "Product"
            },
            {
                path: "products.variant",
                model: "Variant"
            },
            {
                path: "voucherUsage",
                model: "Voucher"
            }
        ]);
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const index = getCart.products.findIndex(item => item.product._id.toString() === idProduct && item.variant._id.toString() === idVariant);
        if (index === -1) return res.status(404).json({ error: 'Can not found index' });

        getCart.products[index].quantity = quantity;
        // await getCart.save();

        const { totalProduct, discountProduct, discountVoucher, total } = caculateTotalCart(getCart);
        getCart.totalProduct = totalProduct;
        getCart.discountProduct = discountProduct;
        getCart.discountVoucher = discountVoucher;
        getCart.total = total;

        await getCart.save();

        return res.status(200).json(getCart);
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
        const getCart = await Cart.findOne({ idUser }).populate([
            { path: 'products.product' },
            { path: 'products.variant' },
            { path: 'voucherUsage' }
        ]);
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const findIndex = getCart.products.findIndex(item => item.variant._id.toString() === idVariant);
        if (findIndex === -1) return res.status(404).json({ error: 'Can not found index' });

        getCart.products = getCart.products.filter((_, index) => index !== findIndex);
        await getCart.save();
        const { totalProduct, discountProduct, discountVoucher, total } = caculateTotalCart(getCart);

        return res.status(200).json({ idVariant, totalProduct, discountProduct, discountVoucher, total });
    } catch (error) {
        console.log('Lỗi ở removeAProduct', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

export const addVoucher = async (req, res) => {
    const { idUser, idVoucher, voucherCode } = req.body;
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
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const findVoucher = await Voucher.findOne({ _id: idVoucher }) || await Voucher.findOne({ voucherCode });
        if (!findVoucher) return res.status(404).json({ error: 'Voucher not found' });

        //Check voucher đã có trong giỏ hàng chưa
        const findIndex = getCart.voucherUsage.findIndex(voucher => voucher._id.toString() === findVoucher._id.toString());
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
            //Check giá tối thiểu để dùng voucher
            const { totalProduct, discountProduct } = caculateTotalCart(getCart);
            if ((totalProduct - discountProduct) < findVoucher.minBill) return res.status(422).json({ error: "Chưa thỏa mãn điều kiện 'đơn tối thiểu'" })
            //Check danh mục sản phẩm được áp dụng (đang phát triển)
            //Check người dùng này đã sử dụng voucher chưa
            const findUsage = await VoucherUsage.findOne({ idUser, idVoucher });
            if (findUsage) return res.status(409).json({ error: 'Voucher đã qua sử dụng' });
        }

        //chỉ chấp nhận dùng 1 voucher
        if (getCart.voucherUsage.length > 0) {
            getCart.voucherUsage = [];
        }
        getCart.voucherUsage.push(findVoucher._id);
        await getCart.save();
        await getCart.populate([
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
        ])
        console.log('getCart', getCart)
        const { allData } = caculateTotalCart(getCart);
        // console.log('allData', allData);
        return res.status(200).json(allData);

    } catch (error) {
        console.log('Lỗi ở addVoucher', error);
        return res.status(500).json({ message: 'Internal Server', error: error.message });
    }
}

export const removeVoucher = async (req, res) => {
    const { idUser, idVoucher } = req.body;
    try {
        const getCart = await Cart.findOne({ idUser });
        if (!getCart) return res.status(404).json({ error: 'Không tìm thấy giỏ hàng' });

        //tìm vị trí lưu voucher
        const findIndex = getCart.voucherUsage.findIndex(usage => usage.toString() === idVoucher);
        // if (findIndex === -1) return res.status(409).json({ error: 'Voucher đã bị xóa khỏi giỏ hàng' });

        //lọc voucher ra khỏi nơi lưu chữ
        getCart.voucherUsage = getCart.voucherUsage.filter((_, index) => index !== findIndex);
        await getCart.save();
        await getCart.populate([
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

        const { allData } = caculateTotalCart(getCart);

        return res.status(200).json(allData);
    } catch (error) {
        console.log('Lỗi ở removeVoucher', error);
        return res.status(500).json({ message: 'Internal Server', error: error.message });
    }
}

export const calculateShipping = async (req, res) => {
    const { destination, idUser } = req.body;
    try {
        if (!destination.lat || !destination.lng) return res.status(400).json({ error: 'Thiếu lat/lng' });

        const getCart = await Cart.findOne({ idUser });
        if (!getCart) return res.status(404).json({ error: 'Cart not found' });

        const distanceKM = haversineDistanceKm(originLat, originLng, destination.lat, destination.lng);
        console.log('distanceKM', distanceKM);
        const fee = calculateShippingFeeKm(distanceKM);
        console.log('fee', fee);
        if (!fee) return res.status(409).json({ error: 'Error when calculate shipping' });

        getCart.shippingFee = fee;
        await getCart.save();

        return res.status(200).json({ distanceKM, ShippingFee: fee });
    } catch (error) {
        console.log('Lỗi ở caculateShipping', error);
        return res.status(500).json({ message: 'Internal server', error: error.message });
    }
}