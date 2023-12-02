import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    cartItems:null,
    totalItems:0,
}


export const cartSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        fetchCartItems:(state) =>{ 
            state.loading = true;
        },

        addItemsCart:(state,action) => {
            state.loading = false
            state.cartItems = action.payload
        },

        setTotalItems:(state,action) => {
            state.totalItems = Number(action.payload);
        },

        removeItemsCart:(state ) =>{
            state.loading = false;
            state.cartItems = null;
        },

        updateTotalItems:(state,action) => {
            state.totalItems = Number(action.payload);
        }
       
       
    }
});

export const {addItemsCart,setTotalItems,fetchCartItems,removeItemsCart,updateTotalItems} 
    = cartSlice.actions;

export default cartSlice.reducer;