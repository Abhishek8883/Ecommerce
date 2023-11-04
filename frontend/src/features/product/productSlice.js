import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:true,
    products:null, 
}

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProducts:(state,action) => {
            state.loading = false;
            state.products = action.payload;
        },
    }
});

export const {setProducts} 
    = productSlice.actions;

export default productSlice.reducer;