import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:true,
    product:null
}

export const productDetailSlice = createSlice({
    name:"productDetails",
    initialState,
    reducers:{
        setProductDetails:(state,action) => {
            state.loading = false;
            state.product = action.payload;
        },
        getProductDetails:(state) => {
            state.loading = true;
        }
    }
});

export const {setProductDetails,getProductDetails} 
    = productDetailSlice.actions;

export default productDetailSlice.reducer;