import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const getSingleCart = createAsyncThunk('cart/getSingleCart', async ({ idUser }: { idUser: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/cart/getSingleCart`, { params: { idUser } });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở cart/getSIngleCart', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const addToCart = createAsyncThunk('cart/addToCart', async ({ idUser, idProduct, idVariant }: { idUser: string, idProduct: string, idVariant: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/cart/addToCart`, { idUser, idProduct, idVariant });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở cart/addToCart', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ idUser, idProduct, idVariant, quantity }: { idUser: string, idProduct: string, idVariant: string, quantity: number }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/cart/updateQuantity`, { idUser, idProduct, idVariant, quantity });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở cart/updateQuantity', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const clearCart = createAsyncThunk('cart/clearCart', async ({ idUser }: { idUser: string }, { rejectWithValue }) => {
    try {

    } catch (error: any) {

    }
})  