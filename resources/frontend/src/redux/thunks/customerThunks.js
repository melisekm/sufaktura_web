import {
    createCustomerSuccess,
    customerDeleteSuccess,
    customersGetSuccess,
    customerUpdatedSuccess,
    modalSubmitFailure,
    modalWindowLoading,
} from "../slices/customers";
import RequestService from "../../utils/request-service";
import {setPaginationData} from "../slices/pagination";
import {tableLoading, tableLoadingFailure, tableLoadingSucess} from "../slices/app";

export const getCustomers = (searchParams) => async (dispatch) => {
    dispatch(tableLoading())
    const url = `/customers${searchParams}`
    try {
        const response = await RequestService.get(url)
        let {data,...pagination} = response.data
        dispatch(customersGetSuccess(data))
        dispatch(tableLoadingSucess())
        dispatch(setPaginationData(pagination))
    } catch (error) {
        dispatch(tableLoadingFailure())
        throw error.response
    }
}

export const createCustomer = (customer) => async (dispatch) => {
    dispatch(modalWindowLoading())
    try {
        const response = await RequestService.post("/customer", customer)
        dispatch(createCustomerSuccess(response.data))
    } catch (error) {
        dispatch(modalSubmitFailure(error.response.data))
        throw error.response
    }
}


export const updateCustomer = (customer) => async (dispatch) => {
    dispatch(modalWindowLoading())
    try {
        const response = await RequestService.put("/customer", customer)
        dispatch(customerUpdatedSuccess(response.data))
    } catch (error) {
        dispatch(modalSubmitFailure(error.response.data))
        throw error.response
    }
}

export const deleteCustomer = (id) => async (dispatch) => {
    dispatch(modalWindowLoading())
    try {
        await RequestService.delete(`/customer/${id}`)
        dispatch(customerDeleteSuccess(id))
    } catch (error) {
        dispatch(modalSubmitFailure(error.response.data))
        throw error.response
    }
}

