import type { ICategory } from '@/common/types/category';
import { createSlice } from "@reduxjs/toolkit";
import { createCategory, editCategory, getAllCategories, getOneCategory, removeCategory } from '../thunks/categoriesThunk';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categoriesData: [] as ICategory[],
        status: 'idle',
        error: ''
    },
    reducers: {},
    extraReducers: (builders) => {
        builders
            .addCase(getAllCategories.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.status = 'getAllCategories.fulfilled';
                state.error = '';
                state.categoriesData = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status = 'getAllCategories.rejected';
                state.error = action.payload as string;
            })

            .addCase(getOneCategory.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(getOneCategory.fulfilled, (state) => {
                state.status = 'getOneCategory.fulfilled';
                state.error = '';
            })
            .addCase(getOneCategory.rejected, (state, action) => {
                state.status = 'getOneCategory.rejected';
                state.error = action.payload as string;
            })

            .addCase(editCategory.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.status = 'editCategory.fulfilled';
                state.error = '';
                const index = state.categoriesData.findIndex(item => item._id === action.payload._id);
                state.categoriesData[index] = action.payload;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.status = 'editCategory.rejected';
                state.error = action.payload as string;
            })

            .addCase(createCategory.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = 'createCategory.fulfilled';
                state.error = '';
                state.categoriesData.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'createCategory.rejected';
                state.error = action.payload as string;
            })

            .addCase(removeCategory.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.status = 'removeCategory.fulfilled';
                state.error = '';
                state.categoriesData = state.categoriesData.filter(item => item._id !== action.payload._id);
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.status = 'removeCategory.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { } = categoriesSlice.actions;
export default categoriesSlice.reducer;