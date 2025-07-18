import express from 'express'
import { CreateAttributeValue } from '../controllers/AttributeValue';

const attributeValueRouter = express.Router();

attributeValueRouter.post('/createAttributeValue', CreateAttributeValue);

export default attributeValueRouter;