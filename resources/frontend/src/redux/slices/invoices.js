import {createSlice} from "@reduxjs/toolkit";

export const invoicesSlice = createSlice({
    name: "invoices",
    initialState: {},
    reducers: {
        editInvoices: (state, action) => {

        }
    },
    extraReducers: {}
})

export const {editInvoices} = invoicesSlice.actions

export default invoicesSlice.reducer

