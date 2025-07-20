import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const getAllAttributeValue = createAsyncThunk('attributeValue/getAllAttributeValue', async ({ filterDelete }: { filterDelete?: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/attributeValue/getAllAttributeValue`, {
            params: filterDelete
        });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở attributeValue/getAllAttributeValue', error);
        return rejectWithValue(error.response.data.error)
    }
})