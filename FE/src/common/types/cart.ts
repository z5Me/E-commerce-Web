import type { IItemCart } from "./itemCart"

export type ICart = {
    _id?: string,
    idUser: string,
    discountVoucher: number,
    products: IItemCart[],
    total: number,
    totalProduct: number,
}