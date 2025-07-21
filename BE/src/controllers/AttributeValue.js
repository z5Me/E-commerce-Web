import Attribute from "../models/Attribute";
import AttributeValue from "../models/AttributeValue"

export const getAllAttributeValue = async (req, res) => {
    const { filterDelete } = req.query;

    try {
        const findAttributeValue = await AttributeValue.find();

        //Nếu không có dữ liệu
        if (!findAttributeValue || findAttributeValue.length === 0) {
            return res.status(404).json({ message: 'AttributeValue lits not found' });
        }

        //Lọc những giá trị bị xóa mềm
        if (filterDelete && filterDelete === 'true') {
            const newAttributeValueList = findAttributeValue.filter((item) => item.isDelete === false);
            return res.status(200).json(newAttributeValueList);
        }

        return res.status(200).json(findAttributeValue);
    } catch (error) {
        console.log('Lỗi ở getAllAttributeValue')
        return res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

export const CreateAttributeValue = async (req, res) => {
    const { name, value, idAttribute } = req.body;
    try {
        //Tìm giá trị trùng lặp
        const existed = await AttributeValue.findOne({ name, value });
        if (existed) return res.status(409).json({ message: 'Value already exists' });

        //Tìm Attribute
        const findAttribute = await Attribute.findOne({ _id: idAttribute });
        if (!findAttribute) return res.status(404).json({ message: 'Attribute not found' });

        //Tạo giá trị
        const newAttributeValue = await AttributeValue.create({ name, value, type: findAttribute.type });

        //Thêm giá trị vừa tạo vào Attribute
        findAttribute.terms.push(newAttributeValue._id);
        await findAttribute.save();

        return res.status(201).json(newAttributeValue);
    } catch (error) {
        console.log('Lỗi ở CreateAttributeValue');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const EditAttributeValue = async (req, res) => {
    const { idAttributeValue, name, value } = req.body;
    try {
        const attributeValue = await AttributeValue.findOne({ _id: idAttributeValue });

        if (!attributeValue) return res.status(404).json({ message: 'Attribute value not found' });

        attributeValue.name = name;
        attributeValue.value = value;

        await attributeValue.save();

        return res.status(200).json(attributeValue);
    } catch (error) {
        console.log('Lỗi ở EditAttributeValue');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const removeAttributeValue = async (req, res) => {
    const { idAttributeValue } = req.body;
    try {
        const attributeValue = await AttributeValue.findOne({ _id: idAttributeValue });

        if (!attributeValue) return res.status(404).json({ message: 'Attribute value not found' });

        attributeValue.isDelete = true;

        await attributeValue.save();

        return res.status(200).json(attributeValue);
    } catch (error) {
        console.log('Lỗi ở removeAttributeValue');
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}