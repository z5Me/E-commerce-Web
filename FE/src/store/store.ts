import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import useAttribute from './slices/attributeSlice';
import useCart from './slices/cartSlice';
import userSlice from './slices/userSlice';
import useVariant from './slices/variantSlice';
import useProduct from './slices/productSlice';
import useOrder from './slices/orderSlice';
import useCategories from './slices/categoriesSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        attribute: useAttribute,
        cart: useCart,
        variant: useVariant,
        product: useProduct,
        order: useOrder,
        categories: useCategories,
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()