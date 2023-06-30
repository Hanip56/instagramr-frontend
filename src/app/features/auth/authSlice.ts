import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../../types/index";
import { RootState } from "../../store";
import { useFollowUserMutation } from "../user/userApiSlice";

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
    followUserState: (state, action) => {
      if (!state.user?.followings.some((userId) => userId === action.payload)) {
        state.user?.followings.push(action.payload);
      }
    },
    unfollowUserState: (state, action) => {
      const index = state.user?.followings?.indexOf(action.payload);
      if (index !== undefined && index !== -1) {
        state.user?.followings.splice(index, 1); // Remove 1 element at the specified index
      }
    },
    editProfilePictureState: (state, action) => {
      if (state.user != undefined) {
        state.user.profilePicture = action.payload;
      }
    },
    removeProfilePictureState: (state) => {
      if (state.user != undefined) {
        state.user.profilePicture = "default_profile_picture.png";
      }
    },
    deletePostState: (state, action) => {
      if (state.user != undefined) {
        state.user.posts = state.user?.posts.filter(
          (post) => post._id !== action.payload
        );
      }
    },
  },
});

export const selectCurrentUser = (state: RootState) =>
  state.auth.user as UserType;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const {
  setCredentials,
  logout,
  followUserState,
  unfollowUserState,
  editProfilePictureState,
  removeProfilePictureState,
  deletePostState,
} = authSlice.actions;

export default authSlice.reducer;
