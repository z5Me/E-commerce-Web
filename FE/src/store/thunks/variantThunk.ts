import type { IAttribute } from "@/common/types/attribute";
import type { IVariant } from "@/common/types/variant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const generateVariant = createAsyncThunk('variant/generateVariant', async (data: IAttribute[], { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/variant/generateVariant`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở variant/generateVariant', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const editVariant = createAsyncThunk('variant/editVariant', async (data: IVariant, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/variant/editVariant`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở variant/editVariant', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const removeVariant = createAsyncThunk('variant/removeVariant', async ({ idVariant }: { idVariant: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/variant/removeVariant`, { idVariant });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở variant/removeVariant', error);
        return rejectWithValue(error.repsonse.data.error);
    }
})