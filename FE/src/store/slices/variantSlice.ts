import type { IVariant } from "@/common/schemas/variantSchema";
import { createSlice } from "@reduxjs/toolkit";
import { generateVariant } from "../thunks/variantThunk";

const variantSlice = createSlice({
    name: 'variant',
    initialState: {
        dataVariant: [] as IVariant[],
        status: 'idle',
        error: ''
    },
    reducers: {},
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

export const { } = variantSlice.actions;
export default variantSlice.reducer;