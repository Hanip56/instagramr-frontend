import { PostType, UserShortType } from "../../../../types";
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

type LikeAndUnlikeResponse = {
  _id: string;
  user: UserShortType;
  messages: string;
};

type LikeAndUnlikeArg = {
  pageNumber?: number;
  postId: string;
  user: UserShortType;
};

type SaveAndUnsaveArg = {
  pageNumber?: number;
  postId: string;
  userId: string;
};

type AddCommentResponse = {
  data: {
    postId: string;
    user: UserShortType;
    comment: string;
  };
  message: string;
};

type AddCommentArg = {
  postId: string;
  comment: string;
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
      providesTags: (result, err, arg) => [{ type: "SinglePost", id: arg }],
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
    likeAndUnlike: builder.mutation<LikeAndUnlikeResponse, LikeAndUnlikeArg>({
      query: ({ postId }) => ({
        url: `/api/post/${postId}/likeAndUnlike`,
        method: "PATCH",
      }),
      async onQueryStarted(
        { postId, pageNumber, user },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData(
            "getFollowingPost",
            pageNumber ?? 1,
            (draft) => {
              const post = draft.posts.find((post) => post._id === postId);
              const liked = post?.likes.some((u) => u._id === user._id);

              if (post) {
                if (liked) {
                  post.likes = post.likes.filter((u) => u._id !== user._id);
                } else {
                  post.likes.push(user);
                }
              }
            }
          )
        );
        const patchResult2 = dispatch(
          postApiSlice.util.updateQueryData(
            "getSinglePost",
            postId,
            (draft) => {
              const post = draft;
              const liked = post?.likes.some((u) => u._id === user._id);

              if (post) {
                if (liked) {
                  post.likes = post.likes.filter((u) => u._id !== user._id);
                } else {
                  post.likes.push(user);
                }
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          patchResult2.undo();
        }
      },
    }),
    saveAndUnsave: builder.mutation<LikeAndUnlikeResponse, SaveAndUnsaveArg>({
      query: ({ postId }) => ({
        url: `/api/post/${postId}/saveandunsave`,
        method: "PATCH",
      }),
      async onQueryStarted(
        { postId, pageNumber, userId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData(
            "getFollowingPost",
            pageNumber ?? 1,
            (draft) => {
              const post = draft.posts.find((post) => post._id === postId);
              const saved = post?.savedBy.some((u) => u === userId);

              if (post) {
                if (saved) {
                  post.savedBy = post.savedBy.filter((u) => u !== userId);
                } else {
                  post.savedBy.push(userId);
                }
              }
            }
          )
        );
        const patchResult2 = dispatch(
          postApiSlice.util.updateQueryData(
            "getSinglePost",
            postId,
            (draft) => {
              const post = draft;
              const saved = post?.savedBy.some((u) => u === userId);

              if (post) {
                if (saved) {
                  post.savedBy = post.savedBy.filter((u) => u !== userId);
                } else {
                  post.savedBy.push(userId);
                }
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          patchResult2.undo();
        }
      },
    }),
    addComment: builder.mutation<AddCommentResponse, AddCommentArg>({
      query: ({ comment, postId }) => ({
        url: `/api/post/${postId}/addComment`,
        method: "PATCH",
        body: { comment },
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "SinglePost", id: arg.postId },
      ],
    }),
  }),
});

export const {
  useGetExplorePostQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useGetFollowingPostQuery,
  useLikeAndUnlikeMutation,
  useSaveAndUnsaveMutation,
  useAddCommentMutation,
} = postApiSlice;
