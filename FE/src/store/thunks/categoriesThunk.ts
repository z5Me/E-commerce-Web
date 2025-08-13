import type { ICategory } from "@/common/types/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const getAllCategories = createAsyncThunk('category/getAllCategories', async ({ filterDelete = 'true' }: { filterDelete?: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/category/getAllCategories`, {
            params: { filterDelete }
        });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở category/getAllCategories', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const getOneCategory = createAsyncThunk('category/getOneCategory', async ({ categoryId, filterDelete = 'true' }: { categoryId: string, filterDelete?: string }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API}/category/getOneCategory`, {
            params: { categoryId, filterDelete }
        });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở category/getOneCategory', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const createCategory = createAsyncThunk('category/createCategory', async (data: ICategory, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/category/createCategory`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở category/createCategory', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const editCategory = createAsyncThunk('category/editCategory', async (data: ICategory, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/category/editCategory`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở category/editCategory', error);
        return rejectWithValue(error.response.data.error);
    }
})

export const removeCategory = createAsyncThunk('category/removeCategory', async (categoryId: string, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/category/removeCategory`, { _id: categoryId });

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở category/removeCategory', error);
        return rejectWithValue(error.response.data.error);
    }
})