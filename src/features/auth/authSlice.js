import { createSlice } from "@reduxjs/toolkit";


const initialState = user
? { isLoggedIn: true, user }
: { isLoggedIn: false, user: null };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login:(state, action)=>{
            state.user = action.payload.user;
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