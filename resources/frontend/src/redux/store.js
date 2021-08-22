import {configureStore} from '@reduxjs/toolkit'
import appReducer from "./slices/app"
import customersReducer from "./slices/customers"
import goodsReducer from "./slices/goods"
import paginationReducer from "./slices/pagination"
import invoicesReducer from "./slices/invoices"

export default configureStore({
    reducer: {
        app: appReducer,
        customers: customersReducer,
        goods: goodsReducer,
        invoices: invoicesReducer,

        pagination: paginationReducer
    },
})
