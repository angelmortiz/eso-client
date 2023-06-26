import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import toastReducer from './toastNotificationSlice';

const store = configureStore({
  reducer: { auth: authReducer, userInfo: userReducer, toast: toastReducer },
});

export default store;
