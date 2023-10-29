import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./reducers/productReducer"


const initialState = {
   products:[]
};

const store = configureStore({
   reducer:{
       product:productReducer
   }
})

export default store; 