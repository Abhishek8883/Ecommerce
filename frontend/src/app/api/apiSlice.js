import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setCredentials,logOut } from "../../features/auth/authSlice";


const baseQueryWithAuth = fetchBaseQuery({
    baseUrl:"http://localhost:4000/api/v1/",
    credentials:'include',
    prepareHeaders:(headers,{getState}) => {
        console.log(getState());
        // const token = getState().auth.token
        // if(token){
        //     headers.set("authorization",`Bearer ${token}`)
        // }
        return headers
    }
})


const baseQueryWithReauth = async (args,api,extraoptions) => {
    const result = await baseQueryWithAuth(args,api,extraoptions) 

    console.log(result);
    if(result.success){

        // const user = api.getState().auth.user;
        console.log("state ------ " +   api.getState());

        // api.dispatch(setCredentials(...result.data,user));
    }
    else{
        api.dispatch(logOut())
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    endpoints:builder => ({})
})

// export const apiAuthSlice = createApi({
//     baseQuery:"http://localhost:4000/api/v1/",
//     endpoints:(builder) => ({})
// })

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