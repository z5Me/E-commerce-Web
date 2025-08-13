import type { IOrder } from "@/common/types/order";
import type { IUpdateStatus } from "@/common/types/updateStatus";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const createOrder = createAsyncThunk('order/createOrder', async (data: IOrder, { rejectWithValue }) => {
    try {
        // console.log('dataOrder', data)
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

export const getOrderByOrderCode = createAsyncThunk('order/getOrderByOrderCode', async ({ orderCode }: { orderCode: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/order/getOrderByOrderCode`, {
            params: { orderCode: orderCode }
        })

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở getOrderByOrderCode', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const generateInvoice = createAsyncThunk('order/generateInvoice', async (orderCode: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/order/generateInvoice`, {
            params: { orderCode },
            responseType: "blob",
            headers: {
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        });

        // Tạo blob từ dữ liệu nhận về
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${orderCode}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Giải phóng bộ nhớ
        window.URL.revokeObjectURL(url);
        return url
    } catch (error: any) {
        console.log('Lỗi ở generateInvoice', error);
        return rejectWithValue(error.response.data.erorr);
    }
})