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

export const getAllVoucher = createAsyncThunk('voucher/getAllVoucher', async ({ filterDelete = 'false', filterActive = 'false' }: { filterDelete?: string, filterActive?: string }, { rejectWithValue }) => {
    //filterDelete = 'true' lọc những voucher chưa bị xóa, filterActive = 'true' lọc những voucher đang được kích hoạt
    try {
        const response = await axios.get(`${API}/voucher/getAllVoucher`, {
            params: { filterDelete, filterActive }
        });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở voucher/getAllVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
});

export const getOneVoucher = createAsyncThunk('voucher/getOneVoucher', async (idVoucher: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/voucher/getOneVoucher`, {
            params: { idVoucher }
        });

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
});

export const editVoucher = createAsyncThunk('voucher/editVoucher', async (data: IVoucher, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/voucher/editVoucher`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở voucher/editVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
});

export const changeActiveVoucher = createAsyncThunk('voucher/changeActiveVoucher', async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/voucher/changeActiveVoucher`, { _id });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở voucher/changeActiveVoucher', error);
        return rejectWithValue(error.response.data.error);
    }
})