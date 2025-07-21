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

export const createAttributeValue = createAsyncThunk('attributeValue/createAttributeValue', async (data: { name: string, value: string, idAttribute: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/attributeValue/createAttributeValue`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở attributevalue.createAttributeValue', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const editAttributeValue = createAsyncThunk('attributeValue/editAttributeValue', async (data: { idAttributeValue: string, name: string, value: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/attributeValue/editAttributeValue`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở attributeValue/editAttributeValue');
        return rejectWithValue(error.response.data.error)
    }
})

export const removeAttributeValue = createAsyncThunk('attributeValue/removeAttributeValue', async (data: { idAttributeValue: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/attributeValue/removeAttributeValue`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở attributeValue/removeAttributeValue');
        return rejectWithValue(error.response.data.error);
    }
})