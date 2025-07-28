import type { IAttributeValue } from "./attributeValue";

export type IVariant = {
    _id: string;
    sku: string;
    price: number;
    typeDiscount: 'percent' | 'fixed';
    discount: number;
    countOnStock: number;
    values: [IAttributeValue];
    image: string;
    isDelete: boolean;
}