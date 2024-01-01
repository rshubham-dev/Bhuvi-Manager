import { createSlice } from "@reduxjs/toolkit";
// import { Cookies } from 'react-cookie';
// const cookies = new Cookies();
// const tokens = cookies.get('accessToken');
const token = sessionStorage.getItem("token");

console.log(token); // Check if the token is correctly retrieved

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
            state.user = {};
            state.isLoggedIn = false;
        }
    },
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer