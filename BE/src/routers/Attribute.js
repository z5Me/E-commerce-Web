import express from 'express'
import { AddValueAttribute, CreateAttribute, getAllAttribute } from '../controllers/Attribute';

const attributeRouter = express.Router();

attributeRouter.get('/getAllAttribute', getAllAttribute)
attributeRouter.post('/createAttribute', CreateAttribute);
attributeRouter.post('/addValueAttribute', AddValueAttribute);

export default attributeRouter;