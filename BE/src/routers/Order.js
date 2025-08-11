import express from 'express';
import { createOrder, getAllOrder, getAllOrderByUserId, updateStatus } from '../controllers/Order';

const orderRouter = express.Router();

orderRouter.post('/createOrder', createOrder);
orderRouter.get('/getAllOrder', getAllOrder);
orderRouter.get('/getAllOrderByUserId', getAllOrderByUserId);
orderRouter.post('/updateStatus', updateStatus);

export default orderRouter;