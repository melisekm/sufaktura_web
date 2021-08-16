import {configureStore} from '@reduxjs/toolkit'
import appReducer from "./slices/app"
import customersReducer from "./slices/customers"


export default configureStore({
    reducer: {
        app: appReducer,
        customers: customersReducer
    },
})
