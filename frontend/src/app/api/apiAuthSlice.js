import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// This api is use when Token is not present.

const baseQuery = fetchBaseQuery({
    baseUrl:"http://localhost:4000/api/v1/",
})

export const apiAuthSlice = createApi({
    reducerPath:"apiAuth",
    baseQuery:baseQuery,
    endpoints:(builder) => ({
        login : builder.mutation({
            query :(credentials) => ({
                url:'login',
                method:'POST',
                body: {...credentials}
            })
        })
    })
})

export const {useLoginMutation} = apiAuthSlice;
