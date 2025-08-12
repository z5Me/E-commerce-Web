import express from 'express';
import { createOrder, getAllOrder, getAllOrderByUserId, getOrderByOrderCode, updateStatus } from '../controllers/Order';

const orderRouter = express.Router();

orderRouter.post('/createOrder', createOrder);
orderRouter.get('/getAllOrder', getAllOrder);
orderRouter.get('/getAllOrderByUserId', getAllOrderByUserId);
orderRouter.post('/updateStatus', updateStatus);
orderRouter.get('/getOrderByOrderCode', getOrderByOrderCode)

export default orderRouter;