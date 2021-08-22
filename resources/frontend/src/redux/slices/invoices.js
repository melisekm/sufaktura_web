import {createSlice} from "@reduxjs/toolkit";

export const invoicesSlice = createSlice({
    name: "invoices",
    initialState: {
        invoices : [],

    },
    reducers: {
        invoicesGetSuccess: (state, action) => {
            state.invoices = action.payload
        }
    },
    extraReducers: {}
})

export const {invoicesGetSuccess} = invoicesSlice.actions

export default invoicesSlice.reducer

