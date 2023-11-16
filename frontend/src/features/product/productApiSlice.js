import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts:builder.query({
            query:([keyword="",page=1,price,category=""]) =>
             `products?&keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}
             ${category === "" ? "" : "&category=" + category}`,
             keepUnusedDataFor: 0.0001
        }),

        getProductDetails:builder.query({ 
            query:(id) => `product/${id}`
        }),
    })
})

export const {useGetProductDetailsQuery,useLazyGetProductsQuery} = productApiSlice;