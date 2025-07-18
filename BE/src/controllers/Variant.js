import Attribute from "../models/Attribute";
import Variant from "../models/Variant";

export const GenerateVariant = async (req, res) => {
    try {
        const getAllAttribute = await Attribute.find().populate('value');
        const valueList = getAllAttribute.map((attri) => attri.value.map(v => v._id));

        if (valueList.length === 1) {
            console.log('Chạy vào length === 1')
            const newValueList = valueList.flatMap(item => item);
            const variantList = [];
            for (const item of newValueList) {
                const variant = await Variant.create({ values: item });
                variantList.push(variant);
            }

            return res.status(201).json(variantList);
        }

        const newValueList = valueList.reduce((acc, current) => {
            const result = [];
            acc.forEach(a => {
                current.forEach(b => {
                    result.push([...a, b])
                })
            })

            return result;
        }, [[]]);

        const variantList = [];
        for (const item of newValueList) {
            const variant = await Variant.create({ values: item });
            variantList.push(variant);
        }

        return res.status(201).json(variantList);
    } catch (error) {
        console.log('Lỗi ở GenerateVariant');
        return res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
}