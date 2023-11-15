import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    products:null,
    productCount:null,
    resultPerPage:null,
}

export const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        setProducts:(state,action) => {
            state.products = action.payload.products;
            state.productCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.loading = false;
        },
        fetchProducts:(state) => {
            state.loading = true;
        }
    }
});

export const {setProducts,fetchProducts} 
    = productSlice.actions;

export default productSlice.reducer;