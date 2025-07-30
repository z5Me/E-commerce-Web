import type { IProduct } from "@/common/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const createProduct = createAsyncThunk('product/createProduct', async (data: any, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/product/createProduct`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở product/createProduct');
        return rejectWithValue(error.response.data.error);
    }
});

export const getAllProducts = createAsyncThunk('product/getAllProducts', async ({ filterDelete = 'true' }: { filterDelete?: string } = {}, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/product/getAllProducts`, { params: { filterDelete } });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở product/getAllProducts', error);
        return rejectWithValue(error.response.data.error);
    }
});

export const removeProduct = createAsyncThunk('product/removeProduct', async ({ idProduct }: { idProduct: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/product/removeProduct`, { idProduct });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở product/removeProduct', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const editProduct = createAsyncThunk('product/editProduct', async (data: IProduct, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/product/editProduct`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở product/editProduct', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const hiddenProduct = createAsyncThunk('product/hiddenProduct', async ({ idProduct }: { idProduct: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/product/hiddenProduct`, { idProduct });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở product/hiddenProduct', error);
        return rejectWithValue(error.response.data.error);
    }
})