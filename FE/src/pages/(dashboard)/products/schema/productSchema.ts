import Joi from "joi";
import { VariantSchema } from "./variantSchema";

export const ProductFormSchema = Joi.object({
    name: Joi.string().min(2).required(),
    desc: Joi.string().min(10).required(),
    shortDesc: Joi.string().min(5).max(160).required(),

    productImage: Joi.any()
        .custom((file, helpers) => {
            const valid = file instanceof File || (file && file[0] instanceof File);
            return valid ? file : helpers.error("any.invalid");
        })
        .messages({
            "any.invalid": "Please upload an image.",
        }),

    variants: Joi.array()
        .items(VariantSchema)
        .min(1)
        .required()
        .messages({
            "array.min": "At least one variant is required",
        }),
});
