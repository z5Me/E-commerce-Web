import express from 'express';
import { createOrder, getAllOrder, updateStatus } from '../controllers/Order';

const orderRouter = express.Router();

orderRouter.post('/createOrder', createOrder);
orderRouter.get('/getAllOrder', getAllOrder);
orderRouter.post('/updateStatus', updateStatus);

export default orderRouter;