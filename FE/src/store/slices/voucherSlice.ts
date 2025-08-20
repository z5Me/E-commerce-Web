import type { IVoucher } from "@/common/types/voucher";
import { createSlice } from "@reduxjs/toolkit";

const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        dataVoucher: [] as IVoucher[],
        status: 'idle',
        error: ''
    },
    reducers: {}
})

export const { } = voucherSlice.actions;
export default voucherSlice.reducer;