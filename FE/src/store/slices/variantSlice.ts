import { createSlice } from "@reduxjs/toolkit";
import { generateVariant } from "../thunks/variantThunk";
import type { IVariant } from "@/common/types/variant";

const variantSlice = createSlice({
    name: 'variant',
    initialState: {
        dataVariant: [] as IVariant[],
        status: 'idle',
        error: ''
    },
    reducers: {
        resetForm(state) {
            state.status = 'idle';
            state.dataVariant = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateVariant.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(generateVariant.fulfilled, (state, action) => {
                state.status = 'generateVariant.fulfilled';
                state.error = '';
                state.dataVariant = action.payload;
            })
            .addCase(generateVariant.rejected, (state, action) => {
                state.status = 'generateVariant.rejected';
                state.error = action.payload as string
            })
    }
})

export const { resetForm } = variantSlice.actions;
export default variantSlice.reducer;