import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import useAttribute from './slices/attributeSlice';
import useCart from './slices/cartSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        attribute: useAttribute,
        cart: useCart,
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()