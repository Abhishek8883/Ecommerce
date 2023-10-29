import {createReducer} from "@reduxjs/toolkit";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS} from "../constants/productConstants"

const initialState = {
    products:[]
}

export const productReducer = createReducer(initialState,{

    ALL_PRODUCT_SUCCESS:(state,action) => {
        
    },

    ALL_PRODUCT_REQUEST:(state,action) => {
    },

    ALL_PRODUCT_FAIL:(state,action) => {
    },


});