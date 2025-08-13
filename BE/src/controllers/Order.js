import Order from "../models/Order";
import { nanoid } from "nanoid";
import puppeteer from "puppeteer";
import Logo from '../public/logo.svg';

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

export const getAllOrderByUserId = async (req, res) => {
    const { userId } = req.query;
    try {
        const allOrder = await Order.find({ userId });
        if (!allOrder) return res.status(404).json({ error: 'Order not found' });

        return res.status(200).json(allOrder);
    } catch (error) {
        console.log('Lỗi ở getAllOrderByUserId', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const updateStatus = async (req, res) => {
    const { orderCode, status } = req.body;
    try {
        const findOrder = await Order.findOne({ orderCode });
        if (!findOrder) return res.status(404).json({ error: 'Order not found' });

        findOrder.status = status;
        findOrder.updateStatus.push(req.body);
        await findOrder.save();

        return res.status(200).json(req.body);
    } catch (error) {
        console.log('Lỗi ở updateStatus', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const getOrderByOrderCode = async (req, res) => {
    const { orderCode } = req.query;
    try {
        const findOrder = await Order.findOne({ orderCode });
        if (!findOrder) return res.status(404).json({ error: 'Order not found' });

        return res.status(200).json(findOrder);
    } catch (error) {
        console.log('Lỗi ở getOrderByOrderCode', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const generateInvoice = async (req, res) => {
    const { orderCode } = req.query;
    try {
        // 1. Lấy dữ liệu đơn hàng (ví dụ lấy từ DB)
        const findOrder = await Order.findOne({ orderCode }).populate("products.product").lean();

        if (!findOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const html = `
        <html lang="vi">
        <head>
            <meta charset="UTF-8" />
            <title>Hóa đơn bán hàng</title>
            <style>
                body { font-family: DejaVu Sans, sans-serif; padding: 40px; }
                .header { display: flex; align-items: center; }
                .logo { width: 50px; height: auto; margin-right: 20px; }
                .title { font-size: 20px; font-weight: bold; }
                .date { font-size: 12px; text-align: right; color: #555; }
                .customer-info { margin-top: 20px; font-size: 14px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; font-size: 14px; }
                th { background-color: #f4f4f4; }
                .total { margin-top: 20px; font-size: 16px; text-align: right; font-weight: bold; }
                .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #555; }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <div class="title">HÓA ĐƠN BÁN HÀNG</div>
                    <div class="date">Ngày: ${new Date(findOrder.createdAt).toLocaleDateString("vi-VN")}</div>
                </div>
            </div>

            <div class="customer-info">
                <div><b>Tên khách hàng:</b> ${findOrder.address.receiver}</div>
                <div><b>Địa chỉ:</b> ${findOrder.address.addressName}</div>
                <div><b>Số điện thoại:</b> ${findOrder.address.phone}</div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>SL</th>
                        <th>Giá</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    ${findOrder.products.map((p, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${p.product.name}</td>
                            <td>${p.quantity}</td>
                            <td>${p.variant.price.toLocaleString("vi-VN")}</td>
                            <td>${(p.variant.price * p.quantity).toLocaleString("vi-VN")}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>

            <div class="total">Tổng cộng: ${findOrder.total.toLocaleString("vi-VN")} VNĐ</div>

            <div class="footer">Cảm ơn quý khách đã mua hàng!</div>
        </body>
        </html>
        `;

        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

        await browser.close();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="invoice-${orderCode}.pdf"`);
        res.send(pdfBuffer);

    } catch (error) {
        console.log('Lỗi ở getOrderByOrderCode', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}