import type { ICategory } from './category';

export type IVoucher = {
    _id?: string,
    voucherCode: string,
    slug?: string,
    minBill: number,
    maxDiscount: number,
    categories: string[],
    discount: number,
    typeOfDiscount: 'percent' | 'fixed',
    startDate: Date,
    endDate: Date,
    quantity: number,
    isActive?: boolean,
    isDelete?: boolean
}