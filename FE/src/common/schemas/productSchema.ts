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
    productImage: z.union([
        z.instanceof(File).refine((file) => file.size > 0, {
            message: "Product image cannot be empty."
        }),
        z.string().url().min(1, { message: "Product image is required." }),
    ]),
    variants: z.array(variantSchema)
})