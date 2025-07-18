import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    name: '',
    slug: '',
    type: '',
    terms: [],
    value: [],
    isDelete: false
}

const attributeSlice = createSlice({
    name: 'attribute',
    initialState: {
        dataAttribute: initialState,
        sattus: 'idle',
        error: ''
    },
    reducers: {}
})

export default attributeSlice.reducer;