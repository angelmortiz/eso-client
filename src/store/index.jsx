import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.jsx';
import userReducer from './userSlice.js';
import toastReducer from './toastNotificationSlice.js';

const store = configureStore({
  reducer: { auth: authReducer, userInfo: userReducer, toast: toastReducer },
});

export default store;
