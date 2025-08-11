import type { IProduct } from "./product"
import type { IVariant } from "./variant"

export type IItemCart = {
    _id?: string,
    product: IProduct,
    quantity: number,
    variant: IVariant
}