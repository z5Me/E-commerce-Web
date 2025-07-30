import { createSlice } from "@reduxjs/toolkit";
import { generateVariant, removeVariant } from "../thunks/variantThunk";
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
        },
        setDataVariant(state, action) {
            state.dataVariant = action.payload;
            state.status = 'idle';
        },
        removeVariantWhenAdd(state, action) {
            state.dataVariant = state.dataVariant.filter(item => item._id.toString() !== action.payload.toString());
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

            .addCase(removeVariant.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(removeVariant.fulfilled, (state, action) => {
                state.status = 'removeVariant.fulfilled';
                state.error = '';
                state.dataVariant = state.dataVariant.filter(item => item._id.toString() !== action.payload._id.toString());
            })
            .addCase(removeVariant.rejected, (state, action) => {
                state.status = 'removeVariant.rejected';
                state.error = action.payload as string;
            })
    }
});

export const { resetForm, setDataVariant } = variantSlice.actions;
export default variantSlice.reducer;