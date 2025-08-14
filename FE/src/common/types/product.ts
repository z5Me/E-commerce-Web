import type { ICategory } from "./category";
import type { IVariant } from "./variant";

export type IProduct = {
    _id?: string;
    name: string;
    desc: string;
    shortDesc: string;
    productImage: string;
    categories: ICategory[] | any[];
    variants: IVariant[];
    slug?: string;
    isDelete?: boolean;
    isHidden?: boolean;
}