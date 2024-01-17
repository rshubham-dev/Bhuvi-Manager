import { createSlice } from "@reduxjs/toolkit";
const token = sessionStorage.getItem("token");

const removeTokenFromSession = () => {
    sessionStorage.removeItem("token");
  };
window.location.reload();

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
            console.log('Logout action triggered');
            removeTokenFromSession();
            window.location.reload();
            return { ...initialState };
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer