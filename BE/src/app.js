import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { config } from 'dotenv';
import { connectDB } from './config/db';
import userRouter from './routers/User';
import variantRouter from './routers/Variant';
import attributeRouter from './routers/Attribute';
import attributeValueRouter from './routers/AttributeValue';
import productRouter from './routers/Product';
import cartRouter from './routers/Cart';
import orderRouter from './routers/Order';
import categoriesRouter from './routers/Categories';

config();

const app = express();


app.use(cookieParser());
// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:5173', // Cho phép FE từ localhost:5173
    credentials: true // Cho phép gửi cookie qua CORS
}));
app.use(express.json());
app.use(morgan('dev'));

// Connect DB
connectDB(process.env.DB_URL);

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 8080;

// Router
app.use('/api', userRouter);
app.use('/api/product', productRouter);
app.use('/api/variant', variantRouter);
app.use('/api/attribute', attributeRouter);
app.use('/api/attributeValue', attributeValueRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoriesRouter);

// Check connect
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export const viteNodeApp = app;