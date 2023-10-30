import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import {api} from "./api/api"

export const store  = configureStore({
    reducer:{
      [api.reducerPath]:api.reducer,
      [productReducer.name]:productReducer
    },
    middleware:(defMiddleware) => defMiddleware().concat(api.middleware)
})