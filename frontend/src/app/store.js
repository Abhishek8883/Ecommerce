import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { apiAuthSlice } from "./api/apiAuthSlice";
import authReducer from '../features/auth/authSlice';
import productReducer from "../features/product/productSlice"


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
        "auth": authReducer,
        "product":productReducer
    },
    middleware: (defMiddleware) => defMiddleware()
        .concat([
            apiSlice.middleware,
            apiAuthSlice.middleware
        ]),
    devTools: true
})