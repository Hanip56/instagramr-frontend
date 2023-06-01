import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followingPostPage: 1,
  explorePostPage: 1,
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
  },
});

export const { nextPageExplorePost, nextPageFollowingPost } = postSlice.actions;

export default postSlice.reducer;
