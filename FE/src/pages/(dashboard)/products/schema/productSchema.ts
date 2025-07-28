import Joi from "joi";
import { VariantSchema } from "./variantSchema";

export const ProductFormSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
    }),
    desc: Joi.string().min(10).required().messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 2 characters',
    }),
    shortDesc: Joi.string().min(5).max(1600).required().messages({
        'string.empty': 'Short description is required',
        'string.min': 'Short description must be at least 5 characters',
        'string.max': 'Short description must be at most 1600 characters',
    }),

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
