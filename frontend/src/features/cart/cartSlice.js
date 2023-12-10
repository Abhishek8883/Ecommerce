import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    cartItems:null,
    totalItems:0,
    shippingInfo:null
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
            state.cartItems = action.payload;
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
        },

        saveShippingInfo:(state,action) => {
            const info = JSON.stringify(action.payload);
            localStorage.setItem("shippingInfo",info);

            state.shippingInfo = action.payload;
        },

        getShippingInfo:(state) => {
            state.loading= true;
            const shippingData = JSON.parse(localStorage.getItem("shippingInfo"));
            if(shippingData){
                state.shippingInfo = shippingData;
            }
            state.loading = false;
        }
       
       
    }
});

export const {addItemsCart,setTotalItems,fetchCartItems,removeItemsCart,updateTotalItems,saveShippingInfo,getShippingInfo} 
    = cartSlice.actions;

export default cartSlice.reducer;