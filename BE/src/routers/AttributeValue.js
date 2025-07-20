import express from 'express'
import { CreateAttributeValue, getAllAttributeValue } from '../controllers/AttributeValue';

const attributeValueRouter = express.Router();

attributeValueRouter.get('/getAllAttributeValue', getAllAttributeValue)
attributeValueRouter.post('/createAttributeValue', CreateAttributeValue);

export default attributeValueRouter;