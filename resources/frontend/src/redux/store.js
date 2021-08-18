import {configureStore} from '@reduxjs/toolkit'
import appReducer from "./slices/app"
import customersReducer from "./slices/customers"
import paginationReducer from "./slices/pagination"

export default configureStore({
    reducer: {
        app: appReducer,
        customers: customersReducer,
        pagination: paginationReducer
    },
})
