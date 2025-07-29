import Variant from "../models/Variant";

export const GenerateVariant = async (req, res) => {
    try {
        const getAllAttribute = req.body;
        const valueList = getAllAttribute?.map((attri) => attri.value);

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
    const { _id } = req.body;
    try {
        const updatedVariant = await Variant.findByIdAndUpdate(_id, req.body, { new: true });

        if (!updatedVariant) return res.status(404).json({ error: "Variant not found" });

        return res.status(200).json(updatedVariant._id);
    } catch (error) {
        console.log('Lỗi ở editVariant', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const removeVariant = async (req, res) => {
    const { idVariant } = req.body;
    try {
        const findVariant = await Variant.findOne({ _id: idVariant });
        if (!findVariant) return res.status(404).json({ error: "Variant not found" });

        findVariant.isDelete = true;
        await findVariant.save();

        return res.status(200).json(findVariant);
    } catch (error) {
        console.log('Lỗi ở removeVariant', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}