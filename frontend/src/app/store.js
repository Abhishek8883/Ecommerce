import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userReducer from '../features/user/userSlice';
import productReducer from "../features/product/productSlice";
import productDetailsReducer from "../features/product/productDetailsSlice";
import updatePasswordReducer from "../features/user/updatePasswordSlice";
import cartReducer from "../features/cart/cartSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        "user": userReducer,
        "products": productReducer,
        "productDetails": productDetailsReducer,
        "updatePassword" : updatePasswordReducer,
        "cart":cartReducer
    },
    middleware: (defMiddleware) => defMiddleware()
        .concat([
            apiSlice.middleware,
        ]),
    devTools: true
})