import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts:builder.query({
            query:() => "products"
        })
    })
})

export const {useGetProductsQuery} = productApiSlice;