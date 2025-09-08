import type { IItemCart } from "./itemCart"
import type { IVoucher } from "./voucher"

export type ICart = {
    _id?: string,
    idUser: string,
    shippingFee: number,
    discountVoucher: number,
    discountProduct: number,
    voucherUsage: IVoucher[],
    products: IItemCart[],
    total: number,
    totalProduct: number,
}