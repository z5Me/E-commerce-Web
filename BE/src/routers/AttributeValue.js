import express from 'express'
import { CreateAttributeValue, EditAttributeValue, getAllAttributeValue, removeAttributeValue } from '../controllers/AttributeValue';

const attributeValueRouter = express.Router();

attributeValueRouter.get('/getAllAttributeValue', getAllAttributeValue);
attributeValueRouter.post('/createAttributeValue', CreateAttributeValue);
attributeValueRouter.post('/editAttributeValue', EditAttributeValue);
attributeValueRouter.post('/removeAttributeValue', removeAttributeValue);

export default attributeValueRouter;