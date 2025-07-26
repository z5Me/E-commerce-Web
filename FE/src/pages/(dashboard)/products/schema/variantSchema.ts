import Joi from "joi";

export const VariantSchema = Joi.object({
    image: Joi.any()
        .custom((file, helpers) => {
            const valid = file instanceof File || (file && file[0] instanceof File);
            return valid ? file : helpers.error("any.invalid");
        })
        .messages({
            "any.invalid": "Please upload an image.",
        }),

    sku: Joi.string()
        .min(2)
        .custom((val, helpers) => {
            if (val.trim() !== val) {
                return helpers.error("string.trim");
            }
            return val;
        })
        .messages({
            "string.min": "SKU must be at least 2 characters.",
            "string.trim": "SKU must not have whitespace.",
        }),

    typeDiscount: Joi.string().valid("percent", "fixed"),

    countOnStock: Joi.number()
        .min(0)
        .messages({
            "number.base": "Must be a number",
            "number.min": "Must be >= 0",
        }),

    price: Joi.number()
        .min(0)
        .messages({
            "number.base": "Must be a number",
            "number.min": "Must be >= 0",
        }),

    discount: Joi.number()
        .min(0)
        .messages({
            "number.base": "Must be a number",
            "number.min": "Must be >= 0",
        }),
})
    .custom((data, helpers) => {
        const { typeDiscount, price, discount } = data;

        if (typeDiscount === "percent" && discount >= 100) {
            return helpers.message({
                custom: "Discount percent must be < 100",
            });
        }

        if (typeDiscount === "fixed" && discount >= price) {
            return helpers.message({
                custom: "Discount must be < price",
            });
        }

        return data;
    });
