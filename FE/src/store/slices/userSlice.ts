import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { reSignIn, saveAddress, saveUserInformation, signIn, signUp } from '../thunks/userThunk';
import type { IUser } from '@/common/types/user';

const initialState: IUser = {
    _id: '',
    userNameFile: '',
    userName: '',
    address: [],
    email: '',
    avatar: '',
    phone: '',
    gender: '',
    birthday: undefined,
    password: '',
    role: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        dataUser: initialState,
        status: 'idle',
        error: ''
    },
    reducers: {
        logOut: (state) => {
            state.dataUser = initialState;
            state.status = 'idle';
            state.error = '';
            Cookies.remove('auth_token', { path: '/' });
        },
        resetStatus: (state) => {
            state.status = 'idle';
        },
        setSelected: (state, action) => {
            if (state.dataUser.address) {
                state.dataUser.address = state.dataUser.address.map((item, i) => ({
                    ...item,
                    selected: i === action.payload.index
                }))
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.status = 'signUp.pending';
            })
            .addCase(signUp.fulfilled, (state) => {
                state.status = 'signUp.fulfilled';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'signUp.rejected';
                state.error = action.payload as string;
            })

            .addCase(signIn.pending, (state) => {
                state.status = 'signIn.pending';
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = 'signIn.fulfilled';
                state.dataUser = {
                    ...state.dataUser, //dữ lại các trường không có trong payload
                    ...action.payload.user,
                }
                if (action.payload.token) {
                    Cookies.set('auth_token', action.payload.token, {
                        expires: 1, // 1 ngày
                        path: '/',
                        sameSite: 'lax'
                    })
                }
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'signIn.rejected';
                state.error = action.payload as string;
            })

            .addCase(reSignIn.pending, (state) => {
                state.status = 'reSignIn.pending';
            })
            .addCase(reSignIn.fulfilled, (state, action) => {
                state.status = 'reSignIn.fulfilled';
                state.dataUser = {
                    ...state.dataUser,
                    ...action.payload
                }
            })
            .addCase(reSignIn.rejected, (state, action) => {
                state.status = 'reSignIn.rejected';
                state.error = action.payload as string;
            })

            .addCase(saveUserInformation.pending, (state) => {
                state.status = 'saveUserInformation.pending';
            })
            .addCase(saveUserInformation.fulfilled, (state, action) => {
                state.status = 'saveUserInformation.fulfilled';
                state.dataUser = {
                    ...state.dataUser,
                    ...action.payload
                }
            })
            .addCase(saveUserInformation.rejected, (state, action) => {
                state.status = 'saveUserInformation.rejected';
                state.error = action.payload as string;
            })

            .addCase(saveAddress.pending, (state) => {
                state.status = 'saveAddress.pending';
            })
            .addCase(saveAddress.fulfilled, (state, action) => {
                state.status = 'saveAddress.fulfilled';
                state.error = '';
                if (!state.dataUser.address) {
                    state.dataUser.address = []
                }
                state.dataUser.address.push(action.payload);
            })
            .addCase(saveAddress.rejected, (state, action) => {
                state.status = 'saveAddress.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { logOut, resetStatus, setSelected } = userSlice.actions
export default userSlice.reducer;