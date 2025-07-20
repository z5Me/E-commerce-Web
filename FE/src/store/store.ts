import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from './slices/userSlice';
import useAttribute from './slices/attributeSlice';
import useAttributeValue from './slices/attributeValueSlice';
import useCart from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        attribute: useAttribute,
        cart: useCart,
        attributeValue: useAttributeValue
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()