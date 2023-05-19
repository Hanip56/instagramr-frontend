import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: window.matchMedia("(prefers-colors-scheme:dark)").matches
    ? "dark"
    : "light",
};

if (initialState.mode === "dark") {
  document.documentElement.classList.add("dark");
}

console.log(
  window.matchMedia("(prefers-colors-schema:dark)").matches ? "dark" : "light"
);

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      if (state.mode === "dark") {
        state.mode = "light";
        document.documentElement.classList.remove("dark");
      } else {
        state.mode = "dark";
        document.documentElement.classList.add("dark");
      }
    },
  },
});

export const { toggleMode } = modeSlice.actions;

export default modeSlice.reducer;
