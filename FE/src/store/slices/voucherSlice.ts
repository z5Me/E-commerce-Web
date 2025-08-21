import type { IVoucher } from "@/common/types/voucher";
import { createSlice } from "@reduxjs/toolkit";
import { createVoucher, getAllVoucher } from "../thunks/voucherThunk";

const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        dataVoucher: [] as IVoucher[],
        status: 'idle',
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllVoucher.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getAllVoucher.fulfilled, (state, action) => {
                state.status = 'getAllVoucher.fulfilled';
                state.error = '';
                state.dataVoucher = action.payload;
            })
            .addCase(getAllVoucher.rejected, (state, action) => {
                state.status = 'getAllVoucher.rejected';
                state.error = action.payload as string;
            })

            .addCase(createVoucher.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(createVoucher.fulfilled, (state, action) => {
                state.status = 'createVoucher.fulfilled';
                state.error = '';
                state.dataVoucher.push(action.payload);
            })
            .addCase(createVoucher.rejected, (state, action) => {
                state.status = 'createVoucher.rejected';
                state.error = action.payload as string;
            })
    },
})

export const { } = voucherSlice.actions;
export default voucherSlice.reducer;