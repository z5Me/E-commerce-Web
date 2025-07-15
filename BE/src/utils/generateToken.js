import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
};
