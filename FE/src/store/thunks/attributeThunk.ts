import type { IAttribute } from "@/common/types/attribute";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const getAllAttribute = createAsyncThunk('attribute/getAllAttribute', async ({ filterDelete }: { filterDelete?: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/attribute/getAllAttribute`, {
            params: { filterDelete }
        });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở attribute/getAllAttribute');
        return rejectWithValue(error.response.data.error)
    }
})

export const createAttribute = createAsyncThunk('attribute/createAttribute', async ({ data }: { data: IAttribute }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/attribute/createAttribute`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở attribute/createAttribute');
        return rejectWithValue(error.response.data.error);
    }
})

export const removeAttribute = createAsyncThunk('attribute/removeAttribute', async (data: { idAttribute: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/attribute/removeAttribute`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở attribute/removeAttribute');
        return rejectWithValue(error.response.data.error);
    }
})