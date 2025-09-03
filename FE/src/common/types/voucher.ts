
export type IVoucher = {
    _id?: string,
    voucherCode: string,
    slug?: string,
    minBill: number,
    maxDiscount: number,
    categories: string[],
    image?: any;
    discount: number,
    typeOfDiscount: 'percent' | 'fixed',
    startDate: Date,
    endDate: Date,
    quantity: number,
    isActive?: boolean,
    isDelete?: boolean
}