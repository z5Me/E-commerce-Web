import express from 'express';
import { createUsage } from '../controllers/VoucherUsage';

const voucherUsageRouter = express.Router();

voucherUsageRouter.post('/createUsage', createUsage);

export default voucherUsageRouter