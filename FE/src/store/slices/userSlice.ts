import type { IUser } from '@/common/types/user';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { addWishList, authGoogle, reSignIn, saveAddress, saveUserInformation, signIn, signUp } from '../thunks/userThunk';

const EXPIRES_IN = import.meta.env.VITE_JWT_EXPIRES_IN;

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
    wishList: [],
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
                state.status = 'pending';
            })
            .addCase(signUp.fulfilled, (state) => {
                state.status = 'signUp.fulfilled';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'signUp.rejected';
                state.error = action.payload as string;
            })

            .addCase(signIn.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = 'signIn.fulfilled';
                state.dataUser = {
                    ...state.dataUser, //dữ lại các trường không có trong payload
                    ...action.payload.user,
                }
                if (action.payload.token) {
                    Cookies.set('auth_token', action.payload.token, {
                        expires: Number(EXPIRES_IN), // 1 ngày
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
                state.status = 'pending';
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
                return;
            })

            .addCase(authGoogle.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(authGoogle.fulfilled, (state, action) => {
                state.status = 'authGoogle.fulfilled';
                state.dataUser = {
                    ...state.dataUser,
                    ...action.payload.user
                };
                state.error = '';
                if (action.payload.token) {
                    Cookies.set('auth_token', action.payload.token, {
                        expires: Number(EXPIRES_IN), // 1 ngày
                        path: '/',
                        sameSite: 'lax'
                    })
                }
            })
            .addCase(authGoogle.rejected, (state, action) => {
                state.status = 'authGoogle.rejected';
                state.error = action.payload as string;
            })

            .addCase(saveUserInformation.pending, (state) => {
                state.status = 'pending';
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
                state.status = 'pending';
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

            .addCase(addWishList.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(addWishList.fulfilled, (state, action) => {
                state.status = 'addWishList.fulfilled';
                state.error = '';
                state.dataUser.wishList = action.payload.wishList;
            })
            .addCase(addWishList.rejected, (state, action) => {
                state.status = 'addWishList.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { logOut, resetStatus, setSelected } = userSlice.actions
export default userSlice.reducer;