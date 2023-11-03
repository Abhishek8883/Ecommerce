import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logOut } from "../../features/auth/authSlice";


const baseQueryWithAuth = fetchBaseQuery({
    baseUrl:"http://localhost:4000/api/v1/",
    credentials:'include',
    prepareHeaders:(headers,{getState}) => {
        const token = getState().auth.token
        if(token){
            headers.set("authorization",token)
        }
        return headers
    }
})


const baseQueryWithReauth = async (args,api,extraoptions) => {
    const result = await baseQueryWithAuth(args,api,extraoptions) 

    if(result?.error?.originalStatus === 401){
        api.dispatch(logOut())
    }
    return result;
}

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:baseQueryWithReauth,
    endpoints:builder => ({})
})



// export const api = createApi({
//     reducerPath:"api",
//     baseQuery:fetchBaseQuery({
//         baseUrl:"http://localhost:4000/api/v1/"
//     }),
//     tagTypes:["Posts"],
//     endpoints:(builder) => ({
//         getPosts : builder.query({
//             query:() => "products",
//             providesTags:["Posts"]
//         }),

//         // newPost:builder.mutation({
//         //     query:(post) => ({
//         //         url:"posts",
//         //         method:"POST",
//         //         body:post
//         //     }),
//         //     invalidatesTags:["Posts"]
//         // })
//     })
// })

// export const {useGetPostsQuery} = api; 