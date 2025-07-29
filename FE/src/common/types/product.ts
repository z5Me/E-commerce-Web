import type { IVariant } from "./variant";

export type IProduct = {
    _id?: string;
    name: string;
    desc: string;
    shortDesc: string;
    productImage: string;
    variant: IVariant[];
    isDelete?: boolean;
    isHidden?: boolean;
}