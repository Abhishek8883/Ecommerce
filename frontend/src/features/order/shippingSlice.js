import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    shippingInfo:{
        address:null,
        city:null,
        state:null,
        country:null,
        pinCode:null,
        phoneNo:null,
    }
}


export const shippingSlice = createSlice({
    name:"products",
    initialState,
    reducers:{

        saveShippingInfo:(state,action) => {
            const info = JSON.stringify(action.payload);
            localStorage.setItem("shippingInfo",info);
            state.shippingInfo = action.payload;
            state.loading = false;
        },

        getShippingInfo:(state) => {
            state.loading = true;
            const shippingData = JSON.parse(localStorage.getItem("shippingInfo"));
            if(shippingData){
                state.shippingInfo = shippingData;
            }
            state.loading = false;
        }
    }
});

export const {saveShippingInfo,getShippingInfo} 
    = shippingSlice.actions;

export default shippingSlice.reducer;