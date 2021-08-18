import {
    createCustomerSuccess,
    customerDeleteSuccess,
    customersGetFailure,
    customersGetSuccess,
    customerUpdatedSuccess,
    modalSubmitFailure,
    modalWindowLoading,
    tableLoading
} from "../slices/customers";
import RequestService from "../../utils/request-service";
import {setPaginationData} from "../slices/pagination";

export const getCustomers = (page = "1", per_page = "10") => async (dispatch) => {
    dispatch(tableLoading())
    const params = {
        "page":page,
        "per_page":per_page
    }
    const queryParams = new URLSearchParams(params)
    const url = `/customers/?${queryParams.toString()}`
    try {
        const response = await RequestService.get(url)
        let {data,...pagination} = response.data
        dispatch(customersGetSuccess(data))
        dispatch(setPaginationData(pagination))
    } catch (error) {
        dispatch(customersGetFailure(error.response.data))
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

