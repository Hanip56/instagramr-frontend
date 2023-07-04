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
  nextPageSavedPost,
  handleMute,
} = postSlice.actions;

export default postSlice.reducer;
