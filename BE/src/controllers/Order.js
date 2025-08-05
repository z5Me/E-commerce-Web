import Order from "../models/Order";

export const createOrder = async (req, res) => {
    try {
        const orderGenerate = await Order.create(req.body);
        if (!orderGenerate) return res.status(400).json({ error: 'Failed to create order' });

        return res.status(201).json(orderGenerate);
    } catch (error) {
        console.log('Lỗi ở createOrder', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}