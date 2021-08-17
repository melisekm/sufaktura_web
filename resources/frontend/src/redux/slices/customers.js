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

        deleteModal:{
            isActive:false,
        },

        modal: {
            isActive: false,
            submitMethod: null,
            selectedCustomer: null,
        },
    },
    reducers: {
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

        toggleDeleteModal:(state,action)=>{
            state.deleteModal.isActive = !state.deleteModal.isActive
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

        customerDeleteSuccess: (state, action) => {
            const index = state.customers.findIndex(x => x.id === action.payload)
            state.customers.splice(index, 1)
            state.modalLoadingStatus = "success"
        },

        modalSubmitFailure: (state, action) => {
            state.modalLoadingStatus = null
            state.modalErrors = action.payload
        }
    },
})

export const {
    toggleModal,
    toggleDeleteModal,
    openNotification,
    closeNotification,
    tableLoading,
    activateServerErrorNotification,
    modalWindowLoading,
    customersGetSuccess,
    customersGetFailure,
    customerUpdatedSuccess,
    createCustomerSuccess,
    customerDeleteSuccess,
    modalSubmitFailure
} = customersSlice.actions

export default customersSlice.reducer
