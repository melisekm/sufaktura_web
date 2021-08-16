import {createSlice} from "@reduxjs/toolkit";

export const goodsSlice = createSlice({
    name: "goods",
    initialState: {},
    reducers: {
        editGoods: (state, action) => {

        }
    },
    extraReducers: {}
})

export const {editGoods} = goodsSlice.actions

export default goodsSlice.reducer

