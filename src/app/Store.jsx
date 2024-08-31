import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../feature/Auth"
import CatReducer from '../feature/CatSlice'
export const Store = configureStore({
  devTools:true,
  reducer: {
    auth: AuthReducer,
     category:CatReducer
  },
});