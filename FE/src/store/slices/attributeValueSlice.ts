import type { IAttributeValue } from "@/common/types/attributeValue";
import { createSlice } from "@reduxjs/toolkit";
import { getAllAttributeValue } from "../thunks/attributeValueThunk";

const attributeValueSlice = createSlice({
    name: 'attributeValue',
    initialState: {
        dataAttrbuteValue: [] as IAttributeValue[],
        status: 'idle',
        error: ''
    },
    reducers: {
        setDefaultAttributeValue(state) {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAttributeValue.pending, (state) => {
                state.status = 'getAllAttributeValue.pending';
                state.error = '';
            })
            .addCase(getAllAttributeValue.fulfilled, (state, action) => {
                state.status = 'getAllAttributeValue.fulfilled';
                state.dataAttrbuteValue = action.payload;
                state.error = '';
            })
            .addCase(getAllAttributeValue.rejected, (state, action) => {
                state.status = 'getAllAttributeValue.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { } = attributeValueSlice.actions;
export default attributeValueSlice.reducer;
