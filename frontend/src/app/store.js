import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import productReducer from "../features/product/productSlice";
import productDetailsReducer from "../features/product/productDetailsSlice"


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        "auth": authReducer,
        "products": productReducer,
        "productDetails": productDetailsReducer,
    },
    middleware: (defMiddleware) => defMiddleware()
        .concat([
            apiSlice.middleware,
        ]),
    devTools: true
})