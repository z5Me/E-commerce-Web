import Product from "../models/Product";

export const getAllProducts = async (req, res) => {
    const { filterDelete } = req.query;
    try {
        const getAll = await Product.find().populate('Variant');
        if (!getAll) return res.status(404).json({ error: 'Products not found.' });

        if (filterDelete) {
            const filterProducts = getAll.filter((item) => item.isDelete === false);
            return res.status(200).json(filterProducts);
        }

        return res.status(200).json(getAll);
    } catch (error) {
        console.log('Lỗi ở getAllProducts');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const createProduct = async (req, res) => {
    console.log(req.body);
    try {
        const newProduct = await Product.create(req.body.data);
        if (!newProduct) return res.status(400).json({ error: 'Invalid product data.' });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.log('Lỗi ở createProduct', error.message);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const removeProduct = async (req, res) => {
    const { idProduct } = req.body;
    try {
        const findProduct = await Product.findOne({ _id: idProduct });
        if (!findProduct) return res.status(404).json({ message: 'Product not found' });

        findProduct.isDelete = true;
        await findProduct.save();

        return res.status(200).json(findProduct);
    } catch (error) {
        console.log('Lỗi ở createProduct');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}