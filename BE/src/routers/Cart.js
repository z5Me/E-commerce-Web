import express from 'express';
import { addToCart, decreaseQuantity, getSingleCart, increaseQuantity, updateQuantity } from '../controllers/Cart';

const cartRouter = express.Router();

cartRouter.get('/getSingleCart', getSingleCart);
cartRouter.post('/addToCart', addToCart);
cartRouter.post('/increaseQuantity', increaseQuantity);
cartRouter.post('/decreaseQuantity', decreaseQuantity);
cartRouter.post('/updateQuantity', updateQuantity);

export default cartRouter