import Product from "../models/Product";

export const getAllProducts = async (req, res) => {
    const { filterDelete, filterHidden } = req.query;
    try {
        let getAll = await Product.find().populate('variants');
        if (!getAll) return res.status(404).json({ error: 'Products not found.' });

        if (filterDelete && filterDelete === 'true') {
            getAll = getAll.filter((item) => item.isDelete === false);
        }

        if (filterHidden && filterHidden === 'true') {
            getAll = getAll.filter(item => item.isHidden === false);
        }

        return res.status(200).json(getAll);
    } catch (error) {
        console.log('Lỗi ở getAllProducts');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
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
        if (!findProduct) return res.status(404).json({ error: 'Product not found' });

        findProduct.isDelete = true;
        await findProduct.save();

        return res.status(200).json(findProduct);
    } catch (error) {
        console.log('Lỗi ở createProduct');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const editProduct = async (req, res) => {
    const { idProduct } = req.body;
    try {
        const updateProduct = await Product.findByIdAndUpdate(idProduct, req.body, { new: true });
        if (!updateProduct) return res.status(404).json({ error: 'Product not found' });

        return res.status(200).json(updateProduct);
    } catch (error) {
        console.log('Lỗi ở editProduct');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const hiddenProduct = async (req, res) => {
    const { idProduct } = req.body;
    try {
        const findProduct = await Product.findOne({ _id: idProduct });
        if (!findProduct) return res.status(404).json({ error: 'Product not found' });

        findProduct.isHidden = !findProduct.isHidden;
        await findProduct.save();

        return res.status(200).json(findProduct);
    } catch (error) {
        console.log('Lỗi ở hiddenProduct', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}