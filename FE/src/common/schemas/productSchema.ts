import { z } from "zod";
import { variantSchema } from "./variantSchema";

export const productSchema = z.object({
    name: z.string()
        .trim()
        .min(1, {
            message: "Name is required.",
        })
        .min(2, {
            message: "Name must be at least 2 characters.",
        }),
    desc: z.string()
        .trim()
        .min(1, {
            message: "Description is required.",
        }),
    shortDesc: z.string()
        .trim()
        .min(1, {
            message: "Short description is required.",
        }),
    productImage: z
        .instanceof(File, {
            message: "Product image is required."
        })
        .refine((file) => file.size > 0, {
            message: "Product image cannot be empty."
        }),
    variants: z.array(variantSchema)
})