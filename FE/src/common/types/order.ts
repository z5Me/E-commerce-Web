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
    total: number,
    updateStatus?: IUpdateStatus[],
    createdAt?: Date
}