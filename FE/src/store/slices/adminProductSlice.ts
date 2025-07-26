import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getAllProducts } from "../thunks/productThunk";
import type { IProduct } from "@/common/types/product";

const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState: {
        dataProducts: [] as IProduct[],
        status: 'idle',
        erorr: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.erorr = '';
                state.status = 'pending';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.erorr = '';
                state.status = 'getAllProducts.fulfilled';
                state.dataProducts = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.erorr = action.payload as string;
                state.status = 'getAllProducts.rejected';
            })

            .addCase(createProduct.pending, (state) => {
                state.status = 'pending';
                state.erorr = '';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'createProduct.fulfilled';
                state.erorr = '';
                state.dataProducts.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'createProduct.rejected';
                state.erorr = action.payload as string;
            })
    }
})

export const { } = adminProductSlice.actions;
export default adminProductSlice.reducer;