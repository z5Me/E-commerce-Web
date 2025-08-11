import type { IAddress } from "./address"
import type { IProduct } from "./product"
import type { IUpdateStatus } from "./updateStatus"

export type IOrder = {
    _id?: string,
    orderCode?: string,
    userId: string,
    address: IAddress,
    products: IProduct[],
    payment: 'cod' | 'momo',
    status?: 'pending' | 'processing' | 'shipping' | 'complete' | 'cancel',
    total: number,
    updateStatus?: IUpdateStatus[]
}