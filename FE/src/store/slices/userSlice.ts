import { createSlice } from '@reduxjs/toolkit';
import { reSignIn, signIn, signUp } from '../thunks/userThunk';
import Cookies from 'js-cookie';

const initialState = {
    _id: '',
    email: '',
    password: '',
    avatar: '',
    userNameFile: '',
    userName: '',
    address: '',
    lat: '',
    lng: ''
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
                // console.log('action: ', action);
                state.status = 'reSignIn.rejected';
                // Cookies.remove('auth_token', { path: '/' });
                // state.dataUser = initialState;
                // state.status = 'idle';
                // state.error = '';
            })
    }
})

export const { logOut, resetStatus } = userSlice.actions
export default userSlice.reducer;