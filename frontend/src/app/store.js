import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { apiAuthSlice } from "./api/apiAuthSlice";
import authReducer from '../features/auth/authSlice'


export const store  = configureStore({
    reducer:{
     [apiSlice.reducerPath]:apiSlice.reducer,
     [apiAuthSlice.reducerPath]:apiAuthSlice.reducer,
     [authReducer.name]:authReducer
    },
    middleware:(defMiddleware) => defMiddleware().concat(apiSlice.middleware),
    devTools:true
})