import {createAsyncThunk} from "@reduxjs/toolkit";
import RequestService from "../../utils/request-service";
//TODO REFACTOR
export const getCustomers = createAsyncThunk(
    "customers/getCustomers",
    async (_,{rejectWithValue}) => {
        return RequestService.get("/customers")
            .then((response) => {
                    return {"data": response.data, "status": response.status}
                }
            ).catch((err) => {
                return rejectWithValue(err.response)
            })
    }
)

export const createCustomer = createAsyncThunk(
    "customers/createCustomer",
    async (customer, {rejectWithValue}) => {
        return RequestService.post("/customer", customer)
            .then((response) => {
                return {"data": response.data, "status": response.status}
            }).catch((err) => {
                return rejectWithValue(err.response)
            })
    }
)


export const updateCustomer = createAsyncThunk(
    "customers/updateCustomer",
    async (customer, {rejectWithValue}) => {
        return RequestService.put("/customer", customer)
            .then((response) => {
                return {"data": response.data, "status": response.status}
            }).catch((err) => {
                return rejectWithValue(err.response)
            })
    }
)

export const deleteCustomer = createAsyncThunk(
    "customers/deleteCustomer",
    async (id, {rejectWithValue}) => {
        return RequestService.delete(`/customer/${id}`)
            .then((response) => {
                return {"data": id, "status": response.status}
            }).catch((err) => {
                return rejectWithValue(err.response)
            })
    }
)
