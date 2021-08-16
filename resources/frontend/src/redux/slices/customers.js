import {createSlice} from "@reduxjs/toolkit";
import {deleteCustomer, getCustomers, updateCustomer, createCustomer} from "../thunks/customers-thunks";

export const customersSlice = createSlice({
    name: "customers",
    initialState: {
        tableLoadingStatus: null,
        creatingCustomerLoadingStatus: null,
        updatingCustomerLoadingStatus: null,
        deletingCustomerLoadingStatus: null,

        customers: [],

        notification: {
            text: "",
            isActive: false,
            design: null,
        },

        modal: {
            isActive: false,
            submitMethod: null,
            selectedCustomer: null,
        },
    },
    reducers: {
        toggleModal: (state, action) => {
            state.modal.isActive = !state.modal.isActive
            if (state.modal.isActive) {
                state.modal.selectedCustomer = action.payload.selectedItem
                state.modal.submitMethod = action.payload.submitMethod
            }
        },
        closeNotification: (state) => {
            state.notification.isActive = false
        },
        activateNotification: (state) => {
            state.notification.isActive = true
        },
        activateServerErrorNotification: (state) => {
            state.notification.text = "INTERNAL SERVER ERROR, TRY AGAIN LATER"
            state.notification.design = "is-danger"
            state.notification.isActive = true
        }
    },
    extraReducers: {

        [getCustomers.pending]: (state, action) => {
            state.tableLoadingStatus = 'loading'
        },
        [getCustomers.fulfilled]: (state, {payload}) => {
            state.customers = payload.data
            state.tableLoadingStatus = 'success'
        },
        [getCustomers.rejected]: (state, action) => {
            state.tableLoadingStatus = 'failed'
        },

        [createCustomer.fulfilled]: (state, action) => {
            state.customers.push(action.payload.data)
            state.creatingCustomerLoadingStatus = 'success'
            state.notification.text = "Sucessfully created a new customer."
            state.notification.design = "is-primary"
            state.notification.isActive = true
        },
        [createCustomer.pending]: (state, action) => {
            state.updatingCustomerLoadingStatus = 'loading'
        },
        [createCustomer.rejected]: (state, action) => {
            state.creatingCustomerLoadingStatus = 'failed'
            throw action.payload // TDOO namiesto throw nastavit errory ako state
        },

        [updateCustomer.fulfilled]: (state, action) => {
            const index = state.customers.findIndex(x => x.id === action.payload.data.id)
            state.customers[index] = action.payload.data
            state.updatingCustomerLoadingStatus = 'success'
            state.notification.text = "Sucessfully edited customer."
            state.notification.design = "is-primary"
            state.notification.isActive = true
        },
        [updateCustomer.pending]: (state, action) => {
            state.updatingCustomerLoadingStatus = 'loading'
        },
        [updateCustomer.rejected]: (state, action) => {
            state.updatingCustomerLoadingStatus = 'failed'
            throw action.payload // TDOO namiesto throw nastavit errory ako state
        },

        [deleteCustomer.fulfilled]: (state, action) => {
            state.customers.splice(action.payload.data.id, 1)
            state.deletingCustomerLoadingStatus = 'success'
            state.notification.text = "Sucessfully deleted customer."
            state.notification.design = "is-primary"
            state.notification.isActive = true
        },
        [updateCustomer.pending]: (state, action) => {
            state.updatingCustomerLoadingStatus = 'loading'
        },
        [deleteCustomer.rejected]: (state, action) => {
            state.deletingCustomerLoadingStatus = 'failed'
        },
    },
})

export const {
    toggleModal,
    closeNotification,
    activateNotification,
    activateServerErrorNotification
} = customersSlice.actions

export default customersSlice.reducer
