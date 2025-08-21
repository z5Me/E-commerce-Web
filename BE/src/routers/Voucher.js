import express from 'express';
import { changeActiveVoucher, createVoucher, editVoucher, getAllVoucher, getOneVoucher, removeVoucher } from '../controllers/Voucher';

const voucherRouter = express.Router();

voucherRouter.get('/getAllVoucher', getAllVoucher);
voucherRouter.get('/getOneVoucher', getOneVoucher);
voucherRouter.post('/createVoucher', createVoucher);
voucherRouter.post('/removeVoucher', removeVoucher);
voucherRouter.post('/changeActiveVoucher', changeActiveVoucher);
voucherRouter.post('/editVoucher', editVoucher);

export default voucherRouter;