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

export const addToCart = createAsyncThunk('cart/addToCart', async ({ idUser, idProduct, idVariant, quantity }: { idUser: string, idProduct: string, idVariant: string, quantity: number }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/cart/addToCart`, { idUser, idProduct, idVariant, quantity });

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
        const response = await axios.post(`${API}/cart/clearCart`, { idUser });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở cart/clearCart', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const removeAProduct = createAsyncThunk('cart/removeAProduct', async ({ idUser, idVariant }: { idUser: string, idVariant: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/cart/removeAProduct`, { idUser, idVariant });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở cart/removeAProduct', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const addVoucher = createAsyncThunk('cart/addVoucher', async (data: { idUser: string, idVoucher: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/cart/addVoucher`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở cart/addVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const removeVoucher = createAsyncThunk('cart/removeVoucher', async (data: { idUser: string, idVoucher: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/cart/removeVoucher`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở cart/removeVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
})