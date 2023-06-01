import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./features/mode/modeSlice";
import modalReducer from "./features/modal/modalSlice";
import authReducer from "./features/auth/authSlice";
import apiSlice from "./api/api";
import postReducer from "./features/post/postSlice";

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    auth: authReducer,
    post: postReducer,
    mode: modeReducer,
    modal: modalReducer,
  },
  middleware: (gdm) => gdm().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
