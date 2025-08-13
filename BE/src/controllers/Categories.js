import Categories from '../models/Categories';
import slugify from 'slugify';

export const getAllCategories = async (req, res) => {
    const { filterDelete } = req.query;
    try {
        let findAll = await Categories.find();
        if (filterDelete && filterDelete === 'true') {
            findAll = findAll.filter((item) => item.isDelete === false);
        };
        if (!findAll) return res.status(404).json({ error: 'Categories not found' });

        return res.status(200).json(findAll);
    } catch (error) {
        console.log('Lỗi ở getAllCategories', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

export const getOneCategory = async (req, res) => {
    const { categoryId, filterDelete } = req.query;
    try {
        let findOne = await Categories.find({ _id: categoryId });
        if (filterDelete && filterDelete === 'true') {
            findOne = findOne.filter((item) => item.isDelete === false);
        };
        if (findOne.length !== 1) return res.status(404).json({ error: 'Category not found' });

        return res.status(200).json(findOne[0]);
    } catch (error) {
        console.log('Lỗi ở getOneCategory', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const createCategory = async (req, res) => {
    try {
        const category = await Categories.create(req.body);
        if (!category) return res.status(400).json({ error: 'Fail to create' });

        return res.status(201).json(category);
    } catch (error) {
        console.log('Lỗi ở CreateCategory', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const editCategory = async (req, res) => {
    const { _id, name } = req.body;
    try {
        const findOne = await Categories.findOne({ _id: _id, isDelete: false });
        if (!findOne) return res.status(404).json({ error: 'Category not found' });

        const newSlug = slugify(name, { lower: true, strict: true });
        findOne.name = name;
        findOne.slug = newSlug;

        await findOne.save();

        return res.status(200).json(findOne);
    } catch (error) {
        console.log('Lỗi ở editCategory', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const removeCategory = async (req, res) => {
    try {
        const findOne = await Categories.findOne({ _id: req.body._id });
        if (!findOne) return res.status(404).json({ error: 'Category not found' });

        findOne.isDelete = true;
        await findOne.save();

        return res.status(200).json(findOne);
    } catch (error) {
        console.log('Lỗi ở removeCategory', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}