import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    products:[],
    error:null,
}

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        ALL_PRODUCT_SUCCESS:(state,action) => {
            state.loading = false;
            state.products = action.payload.products;
        },

        ALL_PRODUCT_REQUEST:(state,action) => {
            state.loading = true;
            state.products = [];
        },

        ALL_PRODUCT_FAIL:(state,action) => {
            state.loading = false;
            state.error  = action.payload;
        },
        
        CLEAR_ERRORS: (state,action) => {
            state.error = null;
        },


    }
});

export const {ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,ALL_PRODUCT_FAIL,CLEAR_ERRORS} 
    = productSlice.actions;

export default productSlice.reducer;