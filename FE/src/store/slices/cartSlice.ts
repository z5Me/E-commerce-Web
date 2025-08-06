import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { addToCart, clearCart, getSingleCart, removeAProduct, updateQuantity } from "../thunks/cartThunk";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: {
            _id: '',
            idUser: '',
            products: [] as any[],
            totalProduct: 0,
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
                    return item.variant._id.toString() === action.payload.variant
                })

                if (indexProduct !== -1) {
                    state.cartData.products[indexProduct].quantity = action.payload.quantity;
                    toast.success('Thêm giỏ hàng thành công');
                    setTimeout(() => {
                        state.status = 'idle'
                    }, 500)
                }

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
                const index = state.cartData.products.findIndex(item => item.variant._id.toString() === action.payload.variant._id.toString());

                if (index !== -1) {
                    state.cartData.products[index].quantity = action.payload.quantity;
                }

                state.cartData.total = state.cartData.products.reduce((acc, curr) => {
                    return acc + ((curr.variant.price - curr.variant.discount) * curr.quantity)
                }, 0);
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
            })
            .addCase(removeAProduct.rejected, (state, action) => {
                state.status = 'removeAProduct.rejected';
                state.error = action.payload as string;
            })
    },
})

export const { setStatusCart, setChangePage } = cartSlice.actions;
export default cartSlice.reducer;