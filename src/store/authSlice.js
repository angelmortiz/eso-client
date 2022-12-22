import {  createSlice }  from '@reduxjs/toolkit';

const initialAuthState = {
    isUserAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isUserAuthenticated = true;
        },
        logout(state) {
            state.isUserAuthenticated = false;
        }
    }
});

export default  authSlice.reducer;
export const authActions = authSlice.actions;