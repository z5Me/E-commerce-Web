import z from "zod";
import { attributeValueSchema } from "./attributeValueSchema";

export const variantSchema = z.object({
    _id: z.string().optional(),
    image: z.union([
        z.instanceof(File),
        z.string().url().min(1, { message: "Image is required." })
    ]),
    sku: z.string().min(1, {
        message: "SKU is required."
    }),
    countOnStock: z
        .coerce.number()
        .min(0, { message: "Count on stock must be at least 0" }) as z.ZodType<number, any, any>, //ép kiểu cho typescript hiểu đây là number

    typeDiscount: z.enum(["percent", "fixed"]).optional(),
    price: z.coerce
        .number()
        .min(0, { message: "Price must be at least 0" }) as z.ZodType<number, any, any>,
    discount: z.coerce
        .number()
        .min(0, { message: "Discount must be at least 0" }) as z.ZodType<number, any, any>,
    values: z.array(attributeValueSchema),
}).refine(
    (data) =>
        data.typeDiscount === 'percent'
            ? data.discount <= 100
            : data.discount < data.price,
    {
        message: "If percent, discount must be <= 100; otherwise, must be less than price",
        path: ['discount']
    }
)