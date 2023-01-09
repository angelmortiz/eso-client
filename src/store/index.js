import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {auth: authReducer, userInfo: userReducer}
});

export default store;