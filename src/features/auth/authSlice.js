import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {},
    isLoggedIn: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login:(state, action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = {};
            state.isLoggedIn = false;
        }
    },
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer