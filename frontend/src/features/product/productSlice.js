import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
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
        }
    }
});

export const {setProducts,fetchProducts} 
    = productSlice.actions;

export default productSlice.reducer;