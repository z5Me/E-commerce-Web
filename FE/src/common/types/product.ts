import type { IVariant } from "./variant";

export type IProduct = {
    _id?: string;
    name: string;
    desc: string;
    shortDesc: string;
    productImage: string;
    variants: IVariant[];
    isDelete?: boolean;
    isHidden?: boolean;
}