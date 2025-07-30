import express from 'express';
import { createProduct, editProduct, getAllProducts, hiddenProduct, removeProduct } from '../controllers/Product';

const productRouter = express.Router();

productRouter.get('/getAllProducts', getAllProducts);
productRouter.post('/createProduct', createProduct);
productRouter.post('/removeProduct', removeProduct);
productRouter.post('/editProduct', editProduct);
productRouter.post('/hiddenProduct', hiddenProduct);

export default productRouter;