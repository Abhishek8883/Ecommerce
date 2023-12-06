import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTotalCartItemsNo: builder.query({
            query: () => `cart/totalItems`
        }),

        getAllCartItems: builder.query({
            query: () => `cart`
        }),

        addItemCart: builder.mutation({
            query: (data) => ({
                url: 'cart/add',
                method: 'POST',
                body: data ,
            })
        }),

        removeItemCart: builder.mutation({
            query: (id) => ({
                url: `cart/${id}`,
                method: 'DELETE',
            })
        }),

        updateItemQuantity: builder.mutation({
            query: (data) => ({
                url: `cart/${data.id}`,
                method: 'PUT',
                body:data,
            })
        }),



    })
})

export const { useLazyGetTotalCartItemsNoQuery,
    useLazyGetAllCartItemsQuery,
    useAddItemCartMutation,
    useRemoveItemCartMutation,
    useUpdateItemQuantityMutation } = cartApiSlice;