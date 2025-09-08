import { createSlice } from "@reduxjs/toolkit";
import { addToCart, addVoucher, calculateShipping, clearCart, getSingleCart, removeAProduct, removeVoucher, updateQuantity } from "../thunks/cartThunk";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: {
            _id: '',
            idUser: '',
            products: [] as any[],
            voucherUsage: [],
            totalProduct: 0,
            discountProduct: 0,
            discountVoucher: 0,
            total: 0,
        },
        status: 'idle',
        error: '',
        changePage: '',
    },
    reducers: {
        setStatusCart(state) {
            state.status = 'idle';
        },
        setChangePage(state, action) {
            state.changePage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSingleCart.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getSingleCart.fulfilled, (state, action) => {
                state.status = 'getSingleCart.fulfilled';
                state.error = '';
                // console.log('action: ', action)
                state.cartData = action.payload;
            })
            .addCase(getSingleCart.rejected, (state, action) => {
                state.status = 'getSingleCart.rejected';
                state.error = action.payload as string;
            })

            .addCase(addToCart.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'addToCart.fulfilled';
                state.error = '';
                const indexProduct = state.cartData.products.findIndex((item) => {
                    return item.variant._id.toString() === action.payload.variant._id.toString()
                })

                if (indexProduct !== -1) {
                    //Cập nhật số lượng
                    state.cartData.products[indexProduct].quantity = action.payload.quantity;

                    //Cập nhật lại tiền
                    state.cartData.totalProduct = action.payload.totalProduct;
                    state.cartData.discountProduct = action.payload.discountProduct;
                    state.cartData.discountVoucher = action.payload.discountVoucher;
                    state.cartData.total = action.payload.total;
                    return;
                }

                //Thêm sp mới vào
                state.cartData.products.push({
                    product: action.payload.product,
                    variant: action.payload.variant,
                    quantity: action.payload.quantity
                })

                //Cập nhật lại tiền
                state.cartData.totalProduct = action.payload.totalProduct;
                state.cartData.discountProduct = action.payload.discountProduct;
                state.cartData.discountVoucher = action.payload.discountVoucher;
                state.cartData.total = action.payload.total;

            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'addToCart.rejected';
                state.error = action.payload as string;
            })

            .addCase(updateQuantity.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.status = 'updateQuantity.fulfilled';
                state.error = '';
                state.cartData = action.payload;
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.status = 'updateQuantity.rejected';
                state.error = action.payload as string;
            })

            .addCase(clearCart.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.status = 'clearCart.fulfilled';
                state.error = '';
                state.cartData.products = [];
                state.cartData.totalProduct = 0;
                state.cartData.discountVoucher = 0;
                state.cartData.total = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.status = 'clearCart.rejected';
                state.error = action.payload as string;
            })

            .addCase(removeAProduct.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(removeAProduct.fulfilled, (state, action) => {
                state.status = 'removeAProduct.fulfilled';
                state.error = '';
                state.cartData.products = state.cartData.products.filter(item => item.variant._id !== action.payload.idVariant.toString());

                //Cập nhật lại tiền
                state.cartData.totalProduct = action.payload.totalProduct;
                state.cartData.discountProduct = action.payload.discountProduct;
                state.cartData.discountVoucher = action.payload.discountVoucher;
                state.cartData.total = action.payload.total;
            })
            .addCase(removeAProduct.rejected, (state, action) => {
                state.status = 'removeAProduct.rejected';
                state.error = action.payload as string;
            })

            .addCase(addVoucher.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(addVoucher.fulfilled, (state, action) => {
                state.status = 'addVoucher.fulfilled';
                state.error = '';
                state.cartData.voucherUsage = action.payload.voucherUsage;

                //Cập nhật lại tiền
                state.cartData.totalProduct = action.payload.totalProduct;
                state.cartData.discountProduct = action.payload.discountProduct;
                state.cartData.discountVoucher = action.payload.discountVoucher;
                state.cartData.total = action.payload.total;
            })
            .addCase(addVoucher.rejected, (state, action) => {
                state.status = 'addVoucher.rejected';
                state.error = action.payload as string;
            })

            .addCase(removeVoucher.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(removeVoucher.fulfilled, (state, action) => {
                state.status = 'removeVoucher.fulfilled';
                state.error = '';
                state.cartData.voucherUsage = action.payload.voucherUsage;

                //Cập nhật lại tiền
                state.cartData.totalProduct = action.payload.totalProduct;
                state.cartData.discountProduct = action.payload.discountProduct;
                state.cartData.discountVoucher = action.payload.discountVoucher;
                state.cartData.total = action.payload.total;
            })
            .addCase(removeVoucher.rejected, (state, action) => {
                state.status = 'removeVoucher.rejected';
                state.error = action.payload as string;
            })

            .addCase(calculateShipping.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(calculateShipping.fulfilled, (state, action) => {
                state.status = 'calculateShipping.fulfilled';
                state.error = '';
                // state.cartData
            })
    },
})

export const { setStatusCart, setChangePage } = cartSlice.actions;
export default cartSlice.reducer;