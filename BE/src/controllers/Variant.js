import Variant from "../models/Variant";

export const GenerateVariant = async (req, res) => {
    try {
        const getAllAttribute = req.body;
        const valueList = getAllAttribute.map((attri) => attri.value);

        if (valueList.length === 1) {
            // console.log('Chạy vào length === 1')
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

export const editVariant = async (req, res) => {
    try {
        //tiếp tục ở đây
    } catch (error) {
        console.log('Lỗi ở editVariant', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}