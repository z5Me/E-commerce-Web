import { createSlice } from "@reduxjs/toolkit";
import { createProduct, editProduct, getAllProducts, removeProduct } from "../thunks/productThunk";
import type { IProduct } from "@/common/types/product";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        //Tiếp ở đây, tạo kiểu dữ liệu cho product, xử lý dữ liệu sau khi call API lấy toàn bộ dataProduct
        dataProducts: [] as IProduct[],
        status: 'idle',
        error: ''
    },
    reducers: {
        setStatusProductPending(state) {
            state.status = 'pending';
        },
        setDefaultProduct(state) {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.error = '';
                state.status = 'pending';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.error = '';
                state.status = 'getAllProducts.fulfilled';
                state.dataProducts = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.error = action.payload as string;
                state.status = 'getAllProducts.rejected';
            })

            .addCase(createProduct.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'createProduct.fulfilled';
                state.error = '';
                state.dataProducts.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'createProduct.rejected';
                state.error = action.payload as string;
            })

            .addCase(removeProduct.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.status = 'removeProduct.fulfilled';
                state.error = '';
                state.dataProducts = state.dataProducts.filter((item) => (
                    item._id !== action.payload._id
                ))
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.status = 'removeProduct.rejected';
                state.error = action.payload as string;
            })

            .addCase(editProduct.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.status = 'editProduct.fulfilled';
                state.error = '';
                const index = state.dataProducts.findIndex(item => item._id?.toString() === action.payload._id.toString());
                if (index !== -1) {
                    state.dataProducts[index] = {
                        ...state.dataProducts[index],
                        ...action.payload
                    }
                }
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'editProduct.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { setStatusProductPending, setDefaultProduct } = productSlice.actions;
export default productSlice.reducer;