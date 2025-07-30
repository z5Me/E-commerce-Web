import type { IVariant } from "./variant";

export type IProduct = {
    _id?: string;
    name: string;
    desc: string;
    shortDesc: string;
    productImage: string;
    variants: IVariant[];
    slug?: string;
    isDelete?: boolean;
    isHidden?: boolean;
}