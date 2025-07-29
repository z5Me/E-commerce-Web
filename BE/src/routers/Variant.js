import express from 'express';
import { editVariant, GenerateVariant, removeVariant } from '../controllers/Variant';

const variantRouter = express.Router();

variantRouter.post('/generateVariant', GenerateVariant);
variantRouter.post('/editVariant', editVariant);
variantRouter.post('/removeVariant', removeVariant);

export default variantRouter