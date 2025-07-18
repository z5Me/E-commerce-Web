import express from 'express'
import { AddValueAttribute, CreateAttribute } from '../controllers/Attribute';

const attributeRouter = express.Router();

attributeRouter.post('/createAttribute', CreateAttribute);
attributeRouter.post('/addValueAttribute', AddValueAttribute);

export default attributeRouter;