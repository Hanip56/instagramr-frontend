import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followingPostPage: 1,
  explorePostPage: 1,
  savedPostPage: 1,
  muted: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    nextPageFollowingPost: (state) => {
      state.followingPostPage++;
    },
    resetPageFollowingPost: (state) => {
      state.followingPostPage = 1;
    },
    nextPageExplorePost: (state) => {
      state.explorePostPage++;
    },
    nextPageSavedPost: (state) => {
      state.savedPostPage++;
    },
    handleMute: (state) => {
      state.muted = !state.muted;
    },
  },
});

export const {
  nextPageExplorePost,
  nextPageFollowingPost,
  resetPageFollowingPost,
  nextPageSavedPost,
  handleMute,
} = postSlice.actions;

export default postSlice.reducer;
