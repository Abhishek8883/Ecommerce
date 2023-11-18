import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        
        login : builder.mutation({
            query :(credentials) => ({
                url:'login',
                method:'POST',
                body: {...credentials}
            })
        }),

        getUserDetails: builder.query({
            query:() => 'getLoggedUser'
        }),

        logout : builder.query({
            query:() => 'logout'
        }),

    })
})

export const {useLoginMutation,useLazyGetUserDetailsQuery,useLazyLogoutQuery} = authApiSlice;
