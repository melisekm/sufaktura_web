import {createSlice} from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        // activePage: "/",

    },
    reducers: {
        // setActivePage: (state,action)=>{
        //     state.activePage = action.payload
        // }
    },
    extraReducers: {},
})

// export const {setActivePage} = appSlice.actions

export default appSlice.reducer
