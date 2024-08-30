import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../feature/Auth"

export const Store = configureStore({
  reducer: {
    auth: AuthReducer,

  },
});