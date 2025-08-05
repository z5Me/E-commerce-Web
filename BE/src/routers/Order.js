import express from 'express';
import { createOrder } from '../controllers/Order';

const orderRouter = express.Router();

orderRouter.post('/createOrder', createOrder);

export default orderRouter;