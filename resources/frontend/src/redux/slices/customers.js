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
        tableLoadingStatus: null,
        modalLoadingStatus: null,

        customers: [],

        modalErrors: initialModalErrors,

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
        internalServerError: (state, action) => {
            console.log("ISE")
        },

        activateServerErrorNotification: (state) => {
            state.notification.text = "INTERNAL SERVER ERROR, TRY AGAIN LATER"
            state.notification.design = "is-danger"
            state.notification.isActive = true
        },

        openNotification: (state, action) => {
            state.notification.text = action.payload.text
            state.notification.design = action.payload.design
            state.notification.isActive = true
        },
        closeNotification: (state) => {
            state.notification.isActive = false
        },


        tableLoading: (state, action) => {
            state.tableLoadingStatus = "loading"
        },

        modalWindowLoading: (state) => {
            state.modalLoadingStatus = "loading"
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
            state.tableLoadingStatus = "success"
            state.customers = action.payload
        },
        customersGetFailure: (state, action) => {
            state.tableLoadingStatus = "failure"
        },

        customerUpdatedSuccess: (state, action) => {
            const index = state.customers.findIndex(x => x.id === action.payload.id)
            state.customers[index] = action.payload
            state.modalLoadingStatus = "success"
        },

        createCustomerSuccess: (state, action) => {
            state.customers.push(action.payload)
            state.modalLoadingStatus = "success"
        },

        modalSubmitFailure: (state, action) => {
            state.modalLoadingStatus = null
            state.modalErrors = action.payload
        }
    },
})

export const {
    internalServerError,
    toggleModal,
    openNotification,
    closeNotification,
    tableLoading,
    activateServerErrorNotification,
    modalWindowLoading,
    customersGetSuccess,
    customersGetFailure,
    customerUpdatedSuccess,
    createCustomerSuccess,
    modalSubmitFailure
} = customersSlice.actions

export default customersSlice.reducer
