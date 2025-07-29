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