import { apiSlice } from "../../app/api/apiSlice";

export const shippingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStripeApiKey: builder.query({
            query: () => `stripeapikey`
        }),

        processPayment: builder.mutation({
            query: (data) => ({
                url: "payment/process",
                method: 'POST',
                body:data,
            })
        }),
    })
})

export const {useGetStripeApiKeyQuery,useProcessPaymentMutation} = shippingApiSlice;