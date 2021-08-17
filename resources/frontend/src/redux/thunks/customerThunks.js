import {
    modalSubmitFailure,
    customerUpdatedSuccess,
    customersGetSuccess,
    customersGetFailure,
    tableLoading,
    modalWindowLoading, createCustomerSuccess, customerDeleteSuccess
} from "../slices/customers";
import RequestService from "../../utils/request-service";

export const getCustomers = () => async (dispatch) => {
    dispatch(tableLoading())
    try {
        const response = await RequestService.get("/customers")
        dispatch(customersGetSuccess(response.data))
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
        const response = await RequestService.delete(`/customer/${id}`)
        dispatch(customerDeleteSuccess(id))
    } catch (error) {
        dispatch(modalSubmitFailure(error.response.data))
        throw error.response
    }
}

