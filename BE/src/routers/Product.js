import express from 'express';
import { createProduct, editProduct, getAllProducts, removeProduct } from '../controllers/Product';

const productRouter = express.Router();

productRouter.get('/getAllProducts', getAllProducts);
productRouter.post('/createProduct', createProduct);
productRouter.post('/removeProduct', removeProduct);
productRouter.post('/editProduct', editProduct);

export default productRouter;