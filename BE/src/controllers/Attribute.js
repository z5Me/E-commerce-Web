import Attribute from "../models/Attribute"

export const getAllAttribute = async (req, res) => {
    const { filterDelete } = req.query;
    try {
        const findAttribute = await Attribute.find().populate([
            { path: 'terms' },
            { path: 'value' }
        ]).lean();
        //Nếu không có dữ liệu
        if (!findAttribute || findAttribute.length === 0) {
            return res.status(404).json({ message: 'Attribute list not found' })
        }

        //Lọc sản phẩm chưa xóa mềm
        if (filterDelete === 'true') {
            const newAttributeList = findAttribute
                .filter((item) => item.isDelete === false)
                .map((item) => ({
                    ...item,
                    terms: item.terms?.filter((term) => term.isDelete === false),
                    value: item.value?.filter((val) => val.isDelete === false),
                }));

            return res.status(200).json(newAttributeList);
        }

        return res.status(200).json(findAttribute);
    } catch (error) {
        console.log('Lỗi ở getAllAttribute');
        return res.status(200).json({ message: 'Lỗi server', error: error.message });
    }
}

export const CreateAttribute = async (req, res) => {
    const { name, type } = req.body;
    try {
        //kiểm tra xem có bị trùng name không
        const existed = await Attribute.findOne({ name });
        if (existed) return res.status(409).json({ message: 'Tên thuộc tính đã tồn tại' });

        const newAttribute = await Attribute.create({ name, type });
        return res.status(201).json(newAttribute);
    } catch (error) {
        console.log('Lỗi ở CreateAttribute');
        return res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

export const AddValueAttribute = async (req, res) => {
    const { idAttribute, idAttributeValue } = req.body;
    try {
        //Tìm Attribute
        const findAttribute = await Attribute.findOne({ _id: idAttribute });
        if (!findAttribute) return res.status(404).json({ message: 'Attribute not found' });

        //Thêm AttributeValue vào value của Attribute
        findAttribute.value.push(idAttributeValue);
        await findAttribute.save();

        return res.status(200).json(findAttribute);
    } catch (error) {
        console.log('Lỗi ở AddValueAttribute');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const removeAttribute = async (req, res) => {
    const { idAttribute } = req.body;
    try {
        //Tìm Attribute
        const findAttribute = await Attribute.findOne({ _id: idAttribute });
        if (!findAttribute) return res.status(404).json({ message: 'Attribute not found' });

        //Chỉnh trạng thái delete
        findAttribute.isDelete = true;
        await findAttribute.save();

        return res.status(200).json(findAttribute);
    } catch (error) {
        console.log('Lỗi ở removeAttribute');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}