import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./modules/User/userSlice";

export const store = configureStore({
  reducer: {
      user: userReducer,
  },
})