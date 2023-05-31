import { UserType } from "../../../../types";
import apiSlice from "../../api/api";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query<UserType, string>({
      query: (username) => `/api/user/${username}`,
    }),
    followUser: builder.mutation({
      query: ({ targetId }) => ({
        url: `/api/user/${targetId}/follow`,
        method: "PATCH",
      }),
    }),
    unfollowUser: builder.mutation({
      query: ({ targetId }) => ({
        url: `/api/user/${targetId}/unfollow`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = userApiSlice;
