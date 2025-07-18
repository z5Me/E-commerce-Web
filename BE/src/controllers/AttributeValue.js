import Attribute from "../models/Attribute";
import AttributeValue from "../models/AttributeValue"

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