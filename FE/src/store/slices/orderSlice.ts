import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getAllOrder, getAllOrderByUserId, getOrderByOrderCode, updateStatus } from "../thunks/orderThunk";
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

            .addCase(updateStatus.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.status = 'updateStatus.fulfilled';
                state.error = '';
                const { orderCode, status } = action.payload;
                const findIndex = state.orderData.findIndex(item => item.orderCode === orderCode);
                state.orderData[findIndex].status = status;
                state.orderData[findIndex].updateStatus?.push(action.payload);

            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.status = 'updateStatus.rejected';
                state.error = action.payload as string;
            })

            .addCase(getAllOrderByUserId.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getAllOrderByUserId.fulfilled, (state, action) => {
                state.status = 'getAllOrderByUserId.fulfilled';
                state.error = '';
                state.orderData = action.payload;
            })
            .addCase(getAllOrderByUserId.rejected, (state, action) => {
                state.status = 'getAllOrderByUserId.rejected';
                state.error = action.payload as string;
            })

            .addCase(getOrderByOrderCode.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getOrderByOrderCode.fulfilled, (state) => {
                state.status = 'getOrderByOrderCode.fulfilled';
                state.error = '';
            })
            .addCase(getOrderByOrderCode.rejected, (state, action) => {
                state.status = 'getOrderByOrderCode.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { setOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;