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

        notificationText: "",
        isNotificationActive: false,

        isModalActive: false,
        modalSubmitMethod: null,
        selectedCustomer: null,
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isModalActive = !state.isModalActive
            if (state.isModalActive) {
                state.selectedCustomer = action.payload.selectedCustomer
                state.modalSubmitMethod = action.payload.submitMethod
            }
        },
        closeNotification: (state) => {
            state.isNotificationActive = false
        },
        activateNotification: (state) => {
            state.isNotificationActive = true
        },
        activateServerErrorNotification: (state) => {
            state.notificationText = "INTERNAL SERVER ERROR, TRY AGAIN LATER"
            state.notificationDesign = "is-danger"
            state.isNotificationActive = true
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
            state.notificationText = "Sucessfully created a new customer."
            state.notificationDesign = "is-primary"
            state.isNotificationActive = true
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
            state.notificationText = "Sucessfully edited customer."
            state.notificationDesign = "is-primary"
            state.isNotificationActive = true
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
            state.notificationText = "Sucessfully deleted customer."
            state.notificationDesign = "is-primary"
            state.isNotificationActive = true
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
