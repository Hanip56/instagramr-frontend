import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode:
    localStorage.getItem("@instagramr_mode") ||
    (window.matchMedia("(prefers-colors-scheme:dark)").matches
      ? "dark"
      : "light"),
};

if (initialState.mode === "dark") {
  document.documentElement.classList.add("dark");
}

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      if (state.mode === "dark") {
        state.mode = "light";
        document.documentElement.classList.remove("dark");
        localStorage.setItem("@instagramr_mode", "light");
      } else {
        state.mode = "dark";
        document.documentElement.classList.add("dark");
        localStorage.setItem("@instagramr_mode", "dark");
      }
    },
  },
});

export const { toggleMode } = modeSlice.actions;

export default modeSlice.reducer;
