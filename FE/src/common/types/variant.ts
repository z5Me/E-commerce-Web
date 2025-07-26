import type { IAttributeValue } from "./attributeValue";

export type IVariant = {
    _id?: string;
    id?: string;
    sku: string;
    price: string;
    typeDiscount: string;
    discount: string;
    countOnStock: string;
    values?: IAttributeValue[];
    image: string;
    isDelete?: boolean;
};