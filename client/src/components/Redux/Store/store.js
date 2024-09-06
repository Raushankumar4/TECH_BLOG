import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
