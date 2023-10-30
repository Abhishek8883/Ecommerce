import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:4000/api/v1/"
    }),
    tagTypes:["Posts"],
    endpoints:(builder) => ({
        getPosts : builder.query({
            query:() => "products",
            providesTags:["Posts"]
        }),

        // newPost:builder.mutation({
        //     query:(post) => ({
        //         url:"posts",
        //         method:"POST",
        //         body:post
        //     }),
        //     invalidatesTags:["Posts"]
        // })
    })
})

export const {useGetPostsQuery} = api;