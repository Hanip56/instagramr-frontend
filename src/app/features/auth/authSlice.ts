import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../../types/index";
import { RootState } from "../../store";

type initialStateType = {
  user: UserType | undefined;
  token: string | undefined;
};

const initialState: initialStateType = {
  user: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      if (user) {
        state.user = user;
      }
      if (token) {
        state.token = token;
      }
    },
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
    },
  },
});

export const selectCurrentUser = (state: RootState) =>
  state.auth.user as UserType;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
