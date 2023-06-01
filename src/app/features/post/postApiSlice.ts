import { PostType } from "../../../../types";
import apiSlice from "../../api/api";

type ExplorePostsState = {
  posts: PostType[];
  maxPages: number;
};

type FollowingPostResponse = {
  posts: PostType[];
  totalPosts: number;
  maxPages: number;
};

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: "/api/post",
        method: "POST",
        body,
      }),
    }),
    getExplorePost: builder.query<ExplorePostsState, string>({
      query: (pageNumber) => `/api/post?page=${pageNumber}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "ExplorePost", id: "LIST" },
              ...result.posts.map((post) => ({
                type: "ExplorePost" as const,
                id: post._id,
              })),
            ]
          : [{ type: "ExplorePost", id: "LIST" }],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        const { posts } = newItems;
        currentCache.posts.push(...posts);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getSinglePost: builder.query<PostType, string>({
      query: (postId) => `/api/post/${postId}`,
    }),
    getFollowingPost: builder.query<FollowingPostResponse, number>({
      query: (pageNumber) => `/api/post/postFollowing?page=${pageNumber}`,
      keepUnusedDataFor: Infinity,
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "FollowingPost", id: "LIST" },
              ...result.posts.map((post) => ({
                type: "FollowingPost" as const,
                id: post._id,
              })),
            ]
          : [{ type: "FollowingPost", id: "LIST" }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        const { posts } = newItems;
        currentCache.posts.push(...posts);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {
  useGetExplorePostQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useGetFollowingPostQuery,
} = postApiSlice;
