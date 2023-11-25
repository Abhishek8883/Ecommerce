import { createSlice } from "@reduxjs/toolkit";

const updatePasswordSlice = createSlice({
    name: 'updatePassword',
    initialState: {
        new_password:null,
        confirm_password:null
    },
    reducers: {
        setCredentials:(state,action) => {
            state.new_password = action.payload.new_password;
            state.confirm_password = action.payload.confirm_password
        },

        removeCredentials :(state) => {
            state.new_password = null;
            state.confirm_password =null;
        }
    }

})

export const {setCredentials,removeCredentials} = updatePasswordSlice.actions;

export default updatePasswordSlice.reducer;

