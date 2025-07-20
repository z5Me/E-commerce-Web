import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

const API = import.meta.env.VITE_API;

export const signUp = createAsyncThunk('user/signUp', async (data: { email: string, password: string, userNameFile: string, userName: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/signup`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở user/signUp:', error.response?.data?.error);
        return rejectWithValue(error.response?.data?.error)
    }
});

export const signIn = createAsyncThunk('user/signIn', async (data: { email: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API}/signin`, data);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở user/signIn: ', error?.response?.data?.error);
        return rejectWithValue(error.response?.data?.error);
    }
});

export const reSignIn = createAsyncThunk('user/reSignIn', async (_, { rejectWithValue }) => {
    const token = Cookies.get('auth_token');
    try {
        const response = await axios.get(`${API}/reSignin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log('response: ', response.data);
        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở user/reSignIn: ', error.response.data.error);
        if (error.response.data.errorName) {
            return rejectWithValue({ expired: true, message: error.response.data.errorName });
        }
        return rejectWithValue(error.response.data.error);
    }
})

export const saveUserInformation = createAsyncThunk('user/saveUserInformation', async (data, { rejectWithValue }) => {
    // console.log('data_userThunk: ', data);
    try {
        const response = await axios.post(`${API}/saveUserInformation`, data);
        // console.log('response: ', response);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở user/saveUserInformation');
        return rejectWithValue(error.response.data.error);
    }
})

export const saveAddress = createAsyncThunk('user/saveAddress', async (data: { _id: string, addressName: string, lat: number, lng: number }, { rejectWithValue }) => {
    // console.log('data_user/saveAddress');
    try {
        const response = await axios.post(`${API}/saveAddress`, data);
        // console.log('response: ', response);

        return response.data;
    } catch (error: any) {
        console.log('Lỗi ở user/saveAddress');
        return rejectWithValue(error.response.data.error);
    }
})