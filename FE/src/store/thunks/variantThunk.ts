import type { IAttribute } from "@/common/types/attribute";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const generateVariant = createAsyncThunk('variant/generateVariant', async (data: { data: IAttribute[] }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/variant/generateVariant`, data);
        // console.log('repsonse: ', response.data);
        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở variant/generateVariant', error);
        return rejectWithValue(error.response.data.error);
    }
})