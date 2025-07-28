import { z } from "zod";

export const attributeValueSchema = z.object({
    _id: z.string(),
    name: z.string(),
    value: z.string(),
    type: z.string().optional(),
    slug: z.string().optional(),
    isDelete: z.boolean(),
    idAttribute: z.string().optional(),
    idAttributeValue: z.string().optional(),
});
