import express from 'express';
import { createProduct, getAllProducts } from '../controllers/Product';

const productRouter = express.Router();

productRouter.get('/getAllProducts', getAllProducts);
productRouter.post('/createProduct', createProduct);

export default productRouter;