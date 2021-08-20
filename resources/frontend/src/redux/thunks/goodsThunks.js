import RequestService from "../../utils/request-service";
import {setPaginationData} from "../slices/pagination";
import {tableLoading, tableLoadingFailure, tableLoadingSucess} from "../slices/app";
import {
    createGoodsSuccess, crudPageFailure,
    crudPageLoading,
    goodsDeleteSuccess,
    goodsGetSuccess, goodsItemGetFailure, goodsItemGetSuccess,
    goodsUpdatedSuccess
} from "../slices/goods";

export const getGoods = (searchParams) => async (dispatch) => {
    dispatch(tableLoading())
    const url = `/goods?${searchParams}`
    try {
        const response = await RequestService.get(url)
        let {data, ...pagination} = response.data
        dispatch(goodsGetSuccess(data))
        dispatch(setPaginationData(pagination))
        dispatch(tableLoadingSucess())
    } catch (error) {
        dispatch(tableLoadingFailure())
        throw error.response
    }
}

export const getGoodsItem = (id) => async (dispatch) => {
    dispatch(crudPageLoading())
    const url = `/goods/${id}`
    try {
        const response = await RequestService.get(url)
        dispatch(goodsItemGetSuccess(response.data))
        return response.data
    } catch (error) {
        dispatch(goodsItemGetFailure(error.response.data))
        throw error.response
    }
}

export const createGoods = (goods) => async (dispatch) => {
    dispatch(crudPageLoading())
    try {
        const response = await RequestService.post("/goods", goods)
        dispatch(createGoodsSuccess(response.data))
    } catch (error) {
        dispatch(crudPageFailure(error.response.data))
        throw error.response
    }
}


export const updateGoods = (goods) => async (dispatch) => {
    dispatch(crudPageLoading())
    try {
        const response = await RequestService.put("/goods", goods)
        dispatch(goodsUpdatedSuccess(response.data))
    } catch (error) {
        dispatch(crudPageFailure(error.response.data))
        throw error.response
    }
}

export const deleteGoods = (id) => async (dispatch) => {
    dispatch(crudPageLoading())
    try {
        await RequestService.delete(`/goods/${id}`)
        dispatch(goodsDeleteSuccess(id))
    } catch (error) {
        dispatch(crudPageFailure(error.response.data))
        throw error.response
    }
}

