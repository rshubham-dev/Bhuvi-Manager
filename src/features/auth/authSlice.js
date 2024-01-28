import { createSlice } from "@reduxjs/toolkit";
const token = sessionStorage.getItem("token");

const initialState = token
    ? { isLoggedIn: true, user: {} }
    : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            sessionStorage.removeItem("token");
            state.isLoggedIn = false;
            state.user = null;
            console.log('Logout action triggered');
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer