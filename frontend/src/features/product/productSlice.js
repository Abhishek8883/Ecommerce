import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    error:null,
    products:null,
    productCount:null,
    resultPerPage:null,
    filteredProductCount:null,
}

export const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        setProducts:(state,action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductCount = action.payload.filteredProductCount;
        },
        fetchProducts:(state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsFail:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
});

export const {setProducts,fetchProducts,fetchProductsFail} 
    = productSlice.actions;

export default productSlice.reducer;