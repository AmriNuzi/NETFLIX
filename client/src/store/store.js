import { configureStore } from '@reduxjs/toolkit';
import LoginReducer  from '../store/login/loginSlice';


export const store = configureStore({
  reducer: {
    LoginReducer,
  },
})