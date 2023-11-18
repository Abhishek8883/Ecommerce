import {createSlice} from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        user:null,
        token:null,
        isAuthenticated:false,
        error:null,
    },
    reducers:{
        setCredentials:(state,action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        setError:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        removeCredentials:(state,action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }

})

export const {setCredentials,removeCredentials,setError} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
    