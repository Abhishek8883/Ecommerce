import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    items:[],
    totalItems:0,
}


export const cartSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        addItem:(state,action) => {
            state.loading = false;
            state.items.push(action.payload.item);
        },
        getItems:(state) => {
            state.loading = true;
        },
        removeItem:(state,action) => {
            state.items = state.items.filter((item,i) => {
                return item.id !== action.payload.id;
            })
        }
    }
});

export const {addItem,getItems,removeItem} 
    = cartSlice.actions;

export default cartSlice.reducer;