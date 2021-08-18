import {createSlice} from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
    name: "pagination",
    initialState: {
        name: null,
        pagination: null,
    },
    reducers: {
        setPaginationName: (state, action) => {
            state.name = action.payload
        },
        setPaginationData: (state, action) => {
            state.pagination = action.payload
        }
    },
})

export const {setPaginationName, changePage, setPages, setPerPage, setPaginationData} = paginationSlice.actions

export default paginationSlice.reducer

