import type { IAddress } from "./address"
import type { IItemCart } from "./itemCart"
import type { IUpdateStatus } from "./updateStatus"

export type IOrder = {
    _id?: string,
    orderCode?: string,
    userId: string,
    address: IAddress,
    products: IItemCart[],
    payment: 'cod' | 'momo',
    status?: 'pending' | 'processing' | 'shipping' | 'complete' | 'cancel',
    totalProduct: number,
    discountProduct: number,
    discountVoucher: number,
    shippingFee: number,
    total: number,
    updateStatus?: IUpdateStatus[],
    createdAt?: Date
}