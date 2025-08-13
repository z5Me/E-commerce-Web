import express from 'express';
import { createCategory, editCategory, getAllCategories, getOneCategory, removeCategory } from '../controllers/Categories';

const categoriesRouter = express.Router();

categoriesRouter.get('/getAllCategories', getAllCategories);
categoriesRouter.get('/getOneCategory', getOneCategory);
categoriesRouter.post('/createCategory', createCategory);
categoriesRouter.post('/editCategory', editCategory);
categoriesRouter.post('/removeCategory', removeCategory);

export default categoriesRouter;