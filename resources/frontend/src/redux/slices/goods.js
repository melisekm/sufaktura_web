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
            submitMethod: null,
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
            state.state.crudPage.errors = action.payload
        },

        goodsItemGetSuccess: (state, action) => {
            state.crudPage.selectedGoodItem = action.payload
            state.crudPage.loading = "success"
        },
        goodsItemGetFailure:(state,action)=>{
            console.log("failure to get goods") // TODO probably fill errors alebo zmazat.
        },
        goodsGetSuccess: (state, action) => {
            state.goods = action.payload
        },

        createGoodsSuccess: (state, action) => {
            state.goods.push(action.payload)
            state.crudPage.loading = "success"
        },

        goodsUpdatedSuccess: (state, action) => {
            const index = state.goods.findIndex(x => x.id === action.payload.id)
            state.goods[index] = action.payload
            state.crudPage.loading = "success"
        },
        goodsDeleteSuccess: (state, action) => {
            const index = state.goods.findIndex(x => x.id === action.payload)
            state.goods.splice(index, 1)
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

