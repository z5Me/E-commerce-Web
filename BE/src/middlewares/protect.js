import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protect = async (req, res, next) => {
    try {
        // Lấy token từ Authorization Header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Chưa đăng nhập hoặc thiếu token' });
        }

        const token = authHeader.split(' ')[1];
        // console.log('token: ', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log('decoded: ', decoded);
        req.user = await User.findById(decoded.id.userId).select('-password');

        next();
    } catch (error) {
        console.error('Lỗi xác thực token:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token đã hết hạn', errorName: 'TokenExpiredError' });
        }
        return res.status(401).json({ error: 'Token không hợp lệ' });
    }
}