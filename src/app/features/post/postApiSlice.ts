import { PostType } from "../../../../types";
import apiSlice from "../../api/api";

type ExplorePostsState = {
  posts: PostType[];
  maxPages: number;
};

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
        console.log({ endpointName });
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
    createPost: builder.mutation({
      query: (body) => ({
        url: "/api/post",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetExplorePostQuery, useCreatePostMutation } = postApiSlice;
