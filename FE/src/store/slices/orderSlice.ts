import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getAllOrder } from "../thunks/orderThunk";
import type { IOrder } from "@/common/types/order";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderData: [] as IOrder[],
        status: 'idle',
        error: '',
    },
    reducers: {
        setOrderStatus(state) {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'createOrder.fulfilled';
                state.error = '';
                state.orderData.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'createOrder.rejected';
                state.error = action.payload as string;
            })

            .addCase(getAllOrder.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.status = 'getAllOrder.fulfilled';
                state.error = '';
                state.orderData = action.payload;
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.status = 'getAllOrder.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { setOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;