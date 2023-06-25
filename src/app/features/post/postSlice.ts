import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followingPostPage: 1,
  explorePostPage: 1,
  savedPostPage: 1,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    nextPageFollowingPost: (state) => {
      state.followingPostPage++;
    },
    nextPageExplorePost: (state) => {
      state.explorePostPage++;
    },
    nextPageSavedPost: (state) => {
      state.savedPostPage++;
    },
  },
});

export const { nextPageExplorePost, nextPageFollowingPost, nextPageSavedPost } =
  postSlice.actions;

export default postSlice.reducer;
