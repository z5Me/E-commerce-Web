import express from 'express'
import { AddValueAttribute, CreateAttribute, editAttribute, getAllAttribute, removeAttribute } from '../controllers/Attribute';

const attributeRouter = express.Router();

attributeRouter.get('/getAllAttribute', getAllAttribute);
attributeRouter.post('/createAttribute', CreateAttribute);
attributeRouter.post('/addValueAttribute', AddValueAttribute);
attributeRouter.post('/editAttribute', editAttribute);
attributeRouter.post('/removeAttribute', removeAttribute);

export default attributeRouter;