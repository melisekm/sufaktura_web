import {createSlice} from "@reduxjs/toolkit";

const initialModalErrors = {
    "name": false,
    "address": false,
    "city": false,
    "postcode": false
}

export const customersSlice = createSlice({
    name: "customers",
    initialState: {
        modalLoadingStatus: null,

        customers: [],

        modalErrors: initialModalErrors,

        modal: {
            isActive: false,
            submitMethod: null,
            selectedCustomer: null,
        },
    },
    reducers: {
        modalWindowLoading: (state) => {
            state.modalLoadingStatus = "loading"
        },
        modalSubmitFailure: (state, action) => {
            state.modalLoadingStatus = null
            state.modalErrors = action.payload
        },

        toggleModal: (state, action) => {
            state.modal.isActive = !state.modal.isActive
            if (state.modal.isActive) {
                state.modal.selectedCustomer = action.payload.selectedItem
                state.modal.submitMethod = action.payload.submitMethod
            }
            state.modalErrors = initialModalErrors
            state.modalLoadingStatus = null
        },

        customersGetSuccess: (state, action) => {
            state.customers = action.payload
        },
        createCustomerSuccess: (state, action) => {
            state.customers.push(action.payload)
            state.modalLoadingStatus = "success"
        },
        customerUpdatedSuccess: (state, action) => {
            const index = state.customers.findIndex(x => x.id === action.payload.id)
            state.customers[index] = action.payload
            state.modalLoadingStatus = "success"
        },
        customerDeleteSuccess: (state, action) => {
            const index = state.customers.findIndex(x => x.id === action.payload)
            state.customers.splice(index, 1)
            state.modalLoadingStatus = "success"
        },
    },
})

export const {
    toggleModal,
    modalWindowLoading,
    customersGetSuccess,
    customerUpdatedSuccess,
    createCustomerSuccess,
    customerDeleteSuccess,
    modalSubmitFailure
} = customersSlice.actions

export default customersSlice.reducer
