import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {isAuthenticated: false, user: null},
    reducers: {
        setUser: (state, action)=>{
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },
        logout: (state)=>{
            state.isAuthenticated = false;
            state.user = null;
        },
    }
});

// get the actions
export const {setUser, logout} = authSlice.actions;

// get the reducer
const authReducer = authSlice.reducer;
export default authReducer;