import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl:"http://localhost:4000/api/v1/",
    credentials:'include',
    prepareHeaders:(headers,{getState}) => {
        const token = getState().user.token
        if(token){
            headers.set("authorization",token)
        }
        return headers
    }
})


export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:baseQuery,
    endpoints:builder => ({})
})
