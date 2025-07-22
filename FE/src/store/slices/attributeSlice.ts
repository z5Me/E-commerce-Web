import { createSlice } from "@reduxjs/toolkit";
import { createAttribute, editAttribute, getAllAttribute, removeAttribute } from "../thunks/attributeThunk";
import type { IAttribute } from "@/common/types/attribute";
import { createAttributeValue, editAttributeValue, getAllAttributeValue, removeAttributeValue } from "../thunks/attributeValueThunk";

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
                state.status = 'pending';
                state.error = '';
            })
            .addCase(createAttribute.fulfilled, (state, action) => {
                state.status = 'createAttribute.fulfilled';
                state.error = '';
                state.dataAttribute.push(action.payload);
            })
            .addCase(createAttribute.rejected, (state, action) => {
                state.status = 'createAttribute.rejected';
                console.log('action: ', action.payload)
                state.error = action.payload as string;
            })

            .addCase(editAttribute.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(editAttribute.fulfilled, (state, action) => {
                state.status = 'editAttribute.fulfilled';
                state.error = '';
                const { idAttribute, data } = action.payload;
                const index = state.dataAttribute.findIndex(
                    (item: any) => item._id.toString() === idAttribute.toString()
                )
                if (index !== -1) {
                    state.dataAttribute[index] = {
                        ...state.dataAttribute[index],
                        ...data
                    }
                }
            })
            .addCase(editAttribute.rejected, (state, action) => {
                state.status = 'editAttribute.rejected';
                state.error = action.payload as string;
            })

            .addCase(removeAttribute.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(removeAttribute.fulfilled, (state, action) => {
                state.status = 'removeAttribute.fulfilled';
                state.error = '';
                state.dataAttribute = state.dataAttribute.filter(
                    (item: any) => item._id !== action.payload.idAttribute.toString()
                );
            })
            .addCase(removeAttribute.rejected, (state, action) => {
                state.status = 'removeAttribute.rejected';
                state.error = action.payload as string;
            })

            //attributeValue
            .addCase(getAllAttributeValue.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getAllAttributeValue.fulfilled, (state) => {
                state.status = 'getAllAttributeValue.fulfilled';
            })
            .addCase(getAllAttributeValue.rejected, (state, action) => {
                state.status = 'getALlAttributeValue.rejected';
                state.error = action.payload as string;
            })

            .addCase(createAttributeValue.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(createAttributeValue.fulfilled, (state, action) => {
                state.status = 'createAttributeValue.fulfilled';
                state.error = '';
                const index = state.dataAttribute.findIndex(
                    (item: any) => item._id.toString() === action.payload.idAttribute.toString()
                );
                if (index !== -1) {
                    if (!state.dataAttribute[index].terms) {
                        state.dataAttribute[index].terms = [];
                    }
                    state.dataAttribute[index].terms.push(action.payload.data);
                }
            })
            .addCase(createAttributeValue.rejected, (state, action) => {
                state.status = 'createAttributeValue.rejected';
                state.error = action.payload as string;
            })

            .addCase(editAttributeValue.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(editAttributeValue.fulfilled, (state, action) => {
                state.status = 'editAttributeValue.fulfilled';
                state.error = '';
                const { idAttribute, idAttributeValue } = action.payload;
                const index = state.dataAttribute.findIndex(
                    (item: any) => item._id.toString() === idAttribute.toString()
                )

                if (index !== -1) {
                    const indexValue = state.dataAttribute[index].terms?.findIndex(
                        (item: any) => item._id.toString() === idAttributeValue.toString()
                    )

                    if (typeof indexValue === 'number' && indexValue !== -1) {
                        if (!state.dataAttribute[index].terms || !state.dataAttribute[index].terms[indexValue]) return;
                        state.dataAttribute[index].terms[indexValue] = action.payload.data;
                    }
                }
            })
            .addCase(editAttributeValue.rejected, (state, action) => {
                state.status = 'editAttributeValue.rejected';
                state.error = action.payload as string;
            })

            .addCase(removeAttributeValue.pending, (state) => {
                state.status = 'pending';
                state.error = '';
            })
            .addCase(removeAttributeValue.fulfilled, (state, action) => {
                state.status = 'removeAttributeValue.fulfilled';
                state.error = '';
                const { idAttribute, idAttributeValue } = action.payload;
                const index = state.dataAttribute.findIndex(
                    (item: any) => item._id.toString() === idAttribute.toString()
                )
                if (index !== -1 && Array.isArray(state.dataAttribute[index].terms)) {
                    state.dataAttribute[index].terms = state.dataAttribute[index].terms.filter(
                        (item: any) => item._id.toString() !== idAttributeValue.toString()
                    )
                }
            })
            .addCase(removeAttributeValue.rejected, (state, action) => {
                state.status = 'removeAttributeValue.rejected';
                state.error = action.payload as string;
            })
    }
})

export const { setDefaultAttribute } = attributeSlice.actions;
export default attributeSlice.reducer;