import { createSlice } from "@reduxjs/toolkit";
import { createAttribute, getAllAttribute } from "../thunks/attributeThunk";
import type { IAttribute } from "@/common/types/attribute";

const attributeSlice = createSlice({
    name: 'attribute',
    initialState: {
        dataAttribute: [] as IAttribute[],
        status: 'idle',
        error: ''
    },
    reducers: {
        setDefaultAttribute(state) {
            state.status = 'idle';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAttribute.pending, (state) => {
                state.status = 'getAllAttribute.pending';
                state.error = '';
            })
            .addCase(getAllAttribute.fulfilled, (state, action) => {
                state.status = 'getAllAttribute.fulfilled';
                state.error = '';
                state.dataAttribute = [
                    ...action.payload
                ]
            })
            .addCase(getAllAttribute.rejected, (state, action) => {
                state.status = 'getAllAttribute.rejected';
                state.error = action.payload as string;
            })

            .addCase(createAttribute.pending, (state) => {
                state.status = 'createAttribute.pending';
                state.error = '';
            })
            .addCase(createAttribute.fulfilled, (state, action) => {
                state.status = 'createAttribute.fulfilled';
                state.error = '';
                state.dataAttribute.push(action.payload);
            })
            .addCase(createAttribute.rejected, (state, action) => {
                state.status = 'createAttribute.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { setDefaultAttribute } = attributeSlice.actions;
export default attributeSlice.reducer;