import {createSlice} from "@reduxjs/toolkit";

export const invoicesSlice = createSlice({
    name: "invoices",
    initialState: {
        invoices: [],
        isAddItemModalActive: false,
        itemsInInvoice: []
    },
    reducers: {
        invoicesGetSuccess: (state, action) => {
            state.invoices = action.payload
        },
        toggleAddItemModal: (state) => {
            state.isAddItemModalActive = !state.isAddItemModalActive
        },
        clearItemsInInvoice: (state) => {
            state.itemsInInvoice = []
        },
        addItemToInvoice: (state, action) => {
            state.itemsInInvoice.push(action.payload)
        },
        deleteItemFromInvoice: (state, action) => {
            const index = state.itemsInInvoice.findIndex(x => x.id === action.payload)
            state.itemsInInvoice[index] = action.payload
        }

    },
    extraReducers: {}
})

export const {
    invoicesGetSuccess,
    toggleAddItemModal,
    clearItemsInInvoice,
    addItemToInvoice,
    deleteItemFromInvoice
} = invoicesSlice.actions

export default invoicesSlice.reducer

