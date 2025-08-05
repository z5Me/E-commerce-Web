import type { IOrder } from "@/common/types/order";
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