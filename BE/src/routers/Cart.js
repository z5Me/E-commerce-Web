import express from 'express';
import { addToCart, addVoucher, calculateShipping, clearCart, decreaseQuantity, getSingleCart, increaseQuantity, removeAProduct, removeVoucher, updateQuantity } from '../controllers/Cart';

const cartRouter = express.Router();

cartRouter.get('/getSingleCart', getSingleCart);
cartRouter.post('/addToCart', addToCart);
cartRouter.post('/increaseQuantity', increaseQuantity);
cartRouter.post('/decreaseQuantity', decreaseQuantity);
cartRouter.post('/updateQuantity', updateQuantity);
cartRouter.post('/clearCart', clearCart);
cartRouter.post('/removeAProduct', removeAProduct);
cartRouter.post('/addVoucher', addVoucher);
cartRouter.post('/removeVoucher', removeVoucher);
cartRouter.post('/calculateShipping', calculateShipping);

export default cartRouter