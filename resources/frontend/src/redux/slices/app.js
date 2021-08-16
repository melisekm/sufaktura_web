import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        isNotificationActive: false,

    },
    reducers: {
        // toggleNotification: (state, action) => {
        //     state.isNotificationActive = !state.isNotificationActive
        // }
    },
    extraReducers: {},
})

// export const {toggleNotification} = appSlice.actions

export default appSlice.reducer
