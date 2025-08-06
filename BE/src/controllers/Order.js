import Order from "../models/Order";

export const createOrder = async (req, res) => {
    try {
        let generateOrderCode;
        while (true) {
            generateOrderCode = nanoid(10);
            const findOrderCode = await Order.findOne({ orderCode: generateOrderCode });
            if (!findOrderCode) break;
        }
        const orderGenerate = await Order.create({ ...req.body, orderCode: generateOrderCode });
        if (!orderGenerate) return res.status(400).json({ error: 'Failed to create order' });

        return res.status(201).json(orderGenerate);
    } catch (error) {
        console.log('Lỗi ở createOrder', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const getAllOrder = async (req, res) => {
    try {
        const allOrder = await Order.find();
        if (!allOrder) return res.status(404).json({ error: 'Order not found' });

        return res.status(200).json(allOrder);
    } catch (error) {
        console.log('Lỗi ở getAllOrder', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const updateStatus = async (req, res) => {
    const { orderCode, status, updateStatus } = req.body;
    try {
        const findOrder = await Order.findOne({ orderCode });
        if (!findOrder) return res.status(404).json({ error: 'Order not found' });

        findOrder.status = status;
        findOrder.updateStatus.push(updateStatus);
        await findOrder.save();

        return res.status(200).json(findOrder);
    } catch (error) {
        console.log('Lỗi ở updateStatus', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}