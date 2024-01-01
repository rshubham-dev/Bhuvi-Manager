import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const token = cookies.get('accessToken');
console.log(token); // Check if the token is correctly retrieved


const initialState = token
? { isLoggedIn: true, user: {} }
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