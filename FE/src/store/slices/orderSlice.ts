import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../thunks/orderThunk";
import type { IOrder } from "@/common/types/order";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderData: [] as IOrder[],
        status: 'idle',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'createOrder.fulfilled';
                state.error = '';
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'createOrder.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { } = orderSlice.actions;
export default orderSlice.reducer;