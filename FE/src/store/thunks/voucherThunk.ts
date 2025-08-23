import type { IVoucher } from "@/common/types/voucher";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const createVoucher = createAsyncThunk('voucher/createVoucher', async (data: IVoucher, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/voucher/createVoucher`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở voucher/createVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
});

export const getAllVoucher = createAsyncThunk('voucher/getAllVoucher', async ({ filterDelete = 'false' }: { filterDelete?: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/voucher/getAllVoucher`, {
            params: { filterDelete }
        });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở voucher/getAllVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
});

export const getOneVoucher = createAsyncThunk('voucher/getOneVoucher', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/voucher/getOneVoucher`);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở voucher/getOneVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
});

export const removeVoucher = createAsyncThunk('voucher/removeVoucher', async ({ _id }: { _id: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/voucher/removeVoucher`, { _id });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở voucher/removeVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
})