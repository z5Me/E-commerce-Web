import { createSlice } from "@reduxjs/toolkit";
import { createAttribute, editAttribute, getAllAttribute, removeAttribute } from "../thunks/attributeThunk";
import type { IAttribute } from "@/common/types/attribute";
import { createAttributeValue, editAttributeValue, getAllAttributeValue, removeAttributeValue } from "../thunks/attributeValueThunk";
import { toast } from "sonner";

const attributeSlice = createSlice({
    name: 'attribute',
    initialState: {
        dataAttribute: [] as IAttribute[],
        dataGenerateVariant: [] as IAttribute[],
        status: 'idle',
        error: ''
    },
    reducers: {
        setDefaultAttribute(state) {
            state.status = 'idle';
            state.error = '';
        },
        setIsDeleteTrue(state, action) {
            const { idAttribute } = action.payload;

            const target = state.dataAttribute.find(item => item._id === idAttribute);
            if (target) {
                target.isDelete = true;
                target.value = [];
            }
        },
        setIsDeleteFalse(state, action) {
            const { idAttribute } = action.payload;

            const target = state.dataAttribute.find(item => item._id === idAttribute);

            if (target) {
                if (target.isDelete === false) toast.warning('Attribute has been added');
                target.isDelete = false;
            }
        },
        removeValue(state, action) {
            const { idAttribute, idValue } = action.payload;
            const findIndex = state.dataAttribute.findIndex(item => item._id === idAttribute);

            if (findIndex !== -1) {
                if (state.dataAttribute[findIndex].value) {
                    state.dataAttribute[findIndex].value = state.dataAttribute[findIndex].value.filter((item: any) => item._id !== idValue);
                }
            }
        },
        addValue(state, action) {
            const { idAttribute, idTerm } = action.payload;
            const findIndex = state.dataAttribute.findIndex(item => item._id === idAttribute);

            if (findIndex !== -1) {
                const copyTerm = state.dataAttribute[findIndex].terms?.filter((item: any) => item._id === idTerm);
                if (copyTerm && copyTerm[0]) {
                    state.dataAttribute[findIndex].value?.push(copyTerm[0]);
                }
            }
        },
        selectAllValue(state, action) {
            const { idAttribute } = action.payload;
            const attribute = state.dataAttribute.find(item => item._id === idAttribute);

            if (attribute) {
                const merged = [...attribute.value || [], ...attribute.terms || []]

                const map = new Map();
                merged.forEach(item => {
                    map.set(item._id, item);
                });

                attribute.value = Array.from(map.values());
            }
        },
        clearAllValue(state, action) {
            const { idAttribute } = action.payload;
            const attribute = state.dataAttribute.find(item => item._id === idAttribute);

            if (attribute) {
                attribute.value = []
            }
        },
        saveAttributes(state) {
            const filterDelete = state.dataAttribute.filter(item => item.isDelete === false);
            if (filterDelete.length === 0) {
                toast.warning("Doesn't has any attribute to save");
                return;
            }

            const attributeNoValue = filterDelete.some(item => item.value?.length === 0);

            if (attributeNoValue) {
                toast.warning('Have an attribute with no value, please check your attribute');
                return;
            }

            state.dataGenerateVariant = filterDelete;
            toast.success('success');
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
                    if (!state.dataAttribute[index].value) {
                        state.dataAttribute[index].value = [];
                    }
                    state.dataAttribute[index].terms.push(action.payload.data);
                    state.dataAttribute[index].value.push(action.payload.data);
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

export const { setDefaultAttribute, setIsDeleteTrue, setIsDeleteFalse, removeValue, addValue, selectAllValue, clearAllValue, saveAttributes } = attributeSlice.actions;
export default attributeSlice.reducer;