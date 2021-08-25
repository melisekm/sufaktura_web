import {createSlice} from "@reduxjs/toolkit";

const initialEditPageErrors = {
    "items": false,
    "customer_name": false,
}

export const invoicesSlice = createSlice({
    name: "invoices",
    initialState: {
        invoices: [],
        newInvoice: {
            itemsInInvoice: [],
            totalPrice: 0,
            errors:initialEditPageErrors
        },
        isAddItemModalActive: false,
    },
    reducers: {
        invoicesGetSuccess: (state, action) => {
            state.invoices = action.payload
        },
        toggleAddItemModal: (state) => {
            state.isAddItemModalActive = !state.isAddItemModalActive
        },
        clearItemsInInvoice: (state) => {
            state.newInvoice.itemsInInvoice = []
            state.newInvoice.totalPrice = 0
            state.newInvoice.errors = initialEditPageErrors
        },
        createInvoiceFailure:(state,action)=>{
            state.newInvoice.errors = action.payload
        },
        addItemToInvoice: (state, action) => {
            const index = state.newInvoice.itemsInInvoice.findIndex(x => x.data.id === action.payload.data.id)
            if (index === -1) {
                state.newInvoice.itemsInInvoice.push(action.payload)
            } else {
                state.newInvoice.itemsInInvoice[index].count += action.payload.count
                state.newInvoice.itemsInInvoice[index].totalPrice += action.payload.totalPrice
            }
            state.newInvoice.totalPrice += parseFloat(action.payload.totalPrice)
        },
        deleteItemFromInvoice: (state, action) => {
            const index = state.newInvoice.itemsInInvoice.findIndex(x => x.data.id === action.payload.data.id)
            state.newInvoice.itemsInInvoice.splice(index, 1)
        }

    },
    extraReducers: {}
})

export const {
    invoicesGetSuccess,
    toggleAddItemModal,
    clearItemsInInvoice,
    addItemToInvoice,
    deleteItemFromInvoice,
    createInvoiceFailure
} = invoicesSlice.actions

export default invoicesSlice.reducer

