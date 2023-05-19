import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./features/mode/modeSlice";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
