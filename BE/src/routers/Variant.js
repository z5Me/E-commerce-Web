import express from 'express';
import { editVariant, GenerateVariant } from '../controllers/Variant';

const variantRouter = express.Router();

variantRouter.post('/generateVariant', GenerateVariant);
variantRouter.post('/editVariant', editVariant);

export default variantRouter