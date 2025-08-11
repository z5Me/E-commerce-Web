import type { IOrder } from "@/common/types/order";
import type { IUpdateStatus } from "@/common/types/updateStatus";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const createOrder = createAsyncThunk('order/createOrder', async (data: IOrder, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/order/createOrder`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở order/createOrder', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const getAllOrder = createAsyncThunk('order/getAllOrder', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/order/getAllOrder`);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở getAllOrder', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const getAllOrderByUserId = createAsyncThunk('order/getAllOrderByUserId', async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/order/getAllOrderByUserId`, {
            params: { userId: userId }
        })

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở getAllOrderByUserId', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const updateStatus = createAsyncThunk('order/updateStatus', async (data: IUpdateStatus, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/order/updateStatus`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở updateStatus ', error);
        return rejectWithValue(error.response.data.error);
    }
})