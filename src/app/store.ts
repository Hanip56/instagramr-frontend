import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./features/mode/modeSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    modal: modalReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
