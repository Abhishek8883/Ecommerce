import { apiSlice } from "../../app/api/apiSlice";

export const shippingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStripeApiKey: builder.query({
            query: () => `stripeapikey`
        }),
    })
})

export const {useLazyGetStripeApiKeyQuery } = shippingApiSlice;