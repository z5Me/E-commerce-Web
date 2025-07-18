import express from 'express';
import { GenerateVariant } from '../controllers/Variant';

const variantRouter = express.Router();

variantRouter.post('/generateVariant', GenerateVariant);

export default variantRouter