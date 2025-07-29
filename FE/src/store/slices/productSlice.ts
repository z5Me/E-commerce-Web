import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getAllProducts } from "../thunks/productThunk";
import type { IProduct } from "@/common/types/product";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        //Tiếp ở đây, tạo kiểu dữ liệu cho product, xử lý dữ liệu sau khi call API lấy toàn bộ dataProduct
        dataProducts: [] as IProduct[],
        status: 'idle',
        erorr: ''
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

export const { setStatusProductPending, setDefaultProduct } = productSlice.actions;
export default productSlice.reducer;