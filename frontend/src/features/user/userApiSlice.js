import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        getUserDetails: builder.query({
            query: () => 'getLoggedUser',
            keepUnusedDataFor: 0.0001
        }),

        updateProfile: builder.mutation({
            query: (formdata) => ({
                url: 'profile/update',
                method: 'PUT',
                body:formdata,
                formData: true,
            })
        }),

        resetPassword: builder.mutation({
            query: (newPassword) => ({
                url: 'password/update',
                method: 'PUT',
                body:newPassword,
                formData:true,
            })
        }),

        logout: builder.query({
            query: () => 'logout'
        }),

    })
})

export const {
    useLoginMutation,
    useLazyGetUserDetailsQuery,
    useLazyLogoutQuery,
    useUpdateProfileMutation,
    useResetPasswordMutation
} = userApiSlice;
