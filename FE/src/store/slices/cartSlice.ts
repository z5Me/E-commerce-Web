import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { addToCart, getSingleCart, updateQuantity } from "../thunks/cartThunk";


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
        error: ''
    },
    reducers: {
        setStatusCart(state) {
            state.status = 'idle';
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
                    return item.variant._id.toString() === action.payload.variant.toString()
                })

                if (indexProduct !== -1) {
                    state.cartData.products[indexProduct].quantity = action.payload.quantity;
                    toast.success('Thêm giỏ hàng thành công');
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
    },
})

export const { setStatusCart } = cartSlice.actions;
export default cartSlice.reducer;