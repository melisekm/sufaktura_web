import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        tableLoadingStatus: null,
        notification: {
            text: "",
            isActive: false,
            design: null,
        },
        deleteModal: {
            loading: false,
            isActive: false,
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

        tableLoading: (state) => {
            state.tableLoadingStatus = "loading"
        },
        tableLoadingSucess: (state) => {
            state.tableLoadingStatus = "success"
        },
        tableLoadingFailure: (state) => {
            state.tableLoadingStatus = "failure"
        },

        toggleDeleteModal: (state) => {
            state.deleteModal.isActive = !state.deleteModal.isActive
            state.deleteModal.loading = "success"
        },
        deleteLoading: (state) => {
            state.deleteModal.loading = "loading"
        },
        deleteFailure: (state) => {
            state.deleteModal.loading = "failure"
        }
    },
    extraReducers: {},
})

export const {
    tableLoading,
    tableLoadingSucess,
    tableLoadingFailure,
    activateServerErrorNotification,
    openNotification,
    closeNotification,
    toggleDeleteModal,
    deleteLoading,
    deleteFailure,
} = appSlice.actions

export default appSlice.reducer
