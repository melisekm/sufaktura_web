import {createSlice} from "@reduxjs/toolkit";


const initialEditPageErrors = {
    "name": false,
    "description": false,
    "price": false,
    "category": false
}

export const goodsSlice = createSlice({
    name: "goods",
    initialState: {
        goods: [],
        crudPage: {
            errors: initialEditPageErrors,
            isActive: false,
            selectedGoodItem: null,
            loading: null
        }
    },
    reducers: {
        crudPageLoading: (state) => {
            state.crudPage.loading = "loading"
        },
        crudPageFailure: (state, action) => {
            state.crudPage.loading = null
            state.crudPage.errors = action.payload
        },

        goodsItemGetSuccess: (state, action) => {
            state.crudPage.selectedGoodItem = action.payload
            state.crudPage.errors = initialEditPageErrors
            state.crudPage.loading = "success"
        },
        goodsItemGetFailure: (state) => {
            state.crudPage.loading = "failure"
        },
        goodsGetSuccess: (state, action) => {
            state.goods = action.payload
        },

        createGoodsSuccess: (state, action) => {
            state.goods.push(action.payload)
            state.crudPage.loading = "success"
        },

        goodsUpdatedSuccess: (state) => {
            state.crudPage.loading = "success"
        },
        goodsDeleteSuccess: (state) => {
            state.crudPage.loading = "success"
        },
    },
})

export const {
    crudPageLoading,
    crudPageFailure,
    goodsItemGetSuccess,
    goodsItemGetFailure,
    goodsGetSuccess,
    createGoodsSuccess,
    goodsUpdatedSuccess,
    goodsDeleteSuccess
} = goodsSlice.actions

export default goodsSlice.reducer

