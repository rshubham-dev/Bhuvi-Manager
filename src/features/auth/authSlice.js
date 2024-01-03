import { createSlice } from "@reduxjs/toolkit";
const token = sessionStorage.getItem("token");


const initialState = token
? { isLoggedIn: true, user: {}}
: { isLoggedIn: false, user: null };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login:(state, action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
                console.log('Logout action triggered');
                sessionStorage.removeItem('token');
                state.user = {};
                state.isLoggedIn = false;
        }
    },
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer