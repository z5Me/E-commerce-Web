import type { IVoucher } from "@/common/types/voucher";
import { createSlice } from "@reduxjs/toolkit";
import { changeActiveVoucher, createVoucher, editVoucher, getAllVoucher, removeVoucher } from "../thunks/voucherThunk";

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

            .addCase(removeVoucher.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(removeVoucher.fulfilled, (state, action) => {
                state.status = 'removeVoucher.fulfilled';
                state.error = '';
                state.dataVoucher = state.dataVoucher.filter((item) => item._id !== action.payload._id);
            })
            .addCase(removeVoucher.rejected, (state, action) => {
                state.status = 'removeVoucher.rejected';
                state.error = action.payload as string;
            })

            .addCase(editVoucher.pending, (state) => {
                state.status = 'pending';
                state.error = ''
            })
            .addCase(editVoucher.fulfilled, (state, action) => {
                state.status = 'editVoucher.fulfilled';
                const findIndex = state.dataVoucher.findIndex((voucher) => voucher._id === action.payload._id);
                if (findIndex !== -1) {
                    state.dataVoucher[findIndex] = action.payload;
                }
            })
            .addCase(editVoucher.rejected, (state, action) => {
                state.status = 'editVoucher.rejected';
                state.error = action.payload as string;
            })

            .addCase(changeActiveVoucher.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(changeActiveVoucher.fulfilled, (state, action) => {
                state.status = 'changeActiveVoucher.fulfilled';
                state.error = '';
                const findIndex = state.dataVoucher.findIndex((voucher) => voucher._id === action.payload._id);
                if (findIndex !== -1) {
                    state.dataVoucher[findIndex].isActive = action.payload.isActive;
                }
            })
            .addCase(changeActiveVoucher.rejected, (state, action) => {
                state.status = 'changeActiveVoucher.rejected';
                state.error = action.payload as string;
            })
    },
})

export const { } = voucherSlice.actions;
export default voucherSlice.reducer;