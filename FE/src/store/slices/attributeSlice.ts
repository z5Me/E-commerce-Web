import { createSlice } from "@reduxjs/toolkit";
import { createAttribute, getAllAttribute, removeAttribute } from "../thunks/attributeThunk";
import type { IAttribute } from "@/common/types/attribute";
import { createAttributeValue, getAllAttributeValue, removeAttributeValue } from "../thunks/attributeValueThunk";

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

            .addCase(removeAttribute.pending, (state) => {
                state.status = 'removeAttribute.pending';
                state.error = '';
            })
            .addCase(removeAttribute.fulfilled, (state) => {
                state.status = 'removeAttribute.fulfilled';
                state.error = '';
            })
            .addCase(removeAttribute.rejected, (state, action) => {
                state.status = 'removeAttribute.rejected';
                state.error = action.payload as string;
            })

            //attributeValue
            .addCase(getAllAttributeValue.pending, (state) => {
                state.status = 'getAllAttribute.pending';
            })
            .addCase(getAllAttributeValue.fulfilled, (state, action) => {
                state.status = 'getAllAttributeValue.fulfilled';
                // console.log('action: ', action);
            })
            .addCase(getAllAttributeValue.rejected, (state, action) => {
                state.status = 'getALlAttributeValue.rejected';
                state.error = action.payload as string;
            })

            .addCase(createAttributeValue.pending, (state) => {
                state.status = 'createAttributeValue.pending';
                state.error = '';
            })
            .addCase(createAttributeValue.fulfilled, (state) => {
                state.status = 'createAttributeValue.fulfilled';
                state.error = '';
            })
            .addCase(createAttributeValue.rejected, (state, action) => {
                state.status = 'createAttributeValue.rejected';
                state.error = action.payload as string;
            })

            .addCase(removeAttributeValue.pending, (state) => {
                state.status = 'removeAttributeValue.pending';
                state.error = '';
            })
            .addCase(removeAttributeValue.fulfilled, (state) => {
                state.status = 'removeAttributeValue.fulfilled';
                state.error = '';
            })
            .addCase(removeAttributeValue.rejected, (state, action) => {
                state.status = 'removeAttributeValue.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { setDefaultAttribute } = attributeSlice.actions;
export default attributeSlice.reducer;