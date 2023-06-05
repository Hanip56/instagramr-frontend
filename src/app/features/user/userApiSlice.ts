import { UserShortType, UserType } from "../../../../types";
import apiSlice from "../../api/api";

type FindUserType = {
  followers: string[];
  totalFollowers: number;
} & UserShortType;

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUser: builder.query<FindUserType[], string>({
      query: (search) => `/api/user/find?search=${search}`,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
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
  useFindUserQuery,
  useGetSingleUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = userApiSlice;
