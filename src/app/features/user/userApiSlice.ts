import { UserShortType, UserType } from "../../../../types";
import apiSlice from "../../api/api";
import { store } from "../../store";

type FindUserType = {
  followers: string[];
  totalFollowers: number;
} & UserShortType;

type EditUserType = {
  fullname?: string;
  username?: string;
  profileBio?: string;
  email?: string;
};

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findUser: builder.query<FindUserType[], string>({
      query: (search) => `/api/user/find?search=${search}`,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getSingleUser: builder.query<UserType, string>({
      query: (slug) => `/api/user/${slug}`,
      providesTags: (result) =>
        result
          ? [{ type: "SingleUser", id: result._id }]
          : [{ type: "SingleUser", id: "SINGLE" }],
    }),
    getSuggestedUser: builder.query<UserType[], void>({
      query: () => `/api/user/suggested`,
    }),
    getFollowers: builder.query<UserShortType[], string>({
      query: (slug) => `/api/user/${slug}/followers`,
    }),
    getFollowings: builder.query<UserShortType[], string>({
      query: (slug) => `/api/user/${slug}/followings`,
    }),
    followUser: builder.mutation({
      query: ({ targetId }) => ({
        url: `/api/user/${targetId}/follow`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _err, arg) => [
        { type: "SingleUser", id: store.getState().auth.user?._id },
        { type: "SingleUser", id: arg.targetId },
      ],
    }),
    unfollowUser: builder.mutation({
      query: ({ targetId }) => ({
        url: `/api/user/${targetId}/unfollow`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _err, arg) => [
        { type: "SingleUser", id: store.getState().auth.user?._id },
        { type: "SingleUser", id: arg.targetId },
      ],
    }),
    editProfile: builder.mutation<UserType, EditUserType>({
      query: (userData) => ({
        url: "/api/user/edit",
        method: "PUT",
        body: { ...userData },
      }),
    }),
    editProfilePicture: builder.mutation<UserType, FormData>({
      query: (formData) => ({
        url: "/api/user/edit/profilePicture",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [
        { type: "SingleUser", id: store.getState().auth.user?._id },
      ],
    }),
    removeProfilePicture: builder.mutation({
      query: () => ({
        url: "/api/user/edit/profilePicture",
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "SingleUser", id: store.getState().auth.user?._id },
      ],
    }),
  }),
});

export const {
  useFindUserQuery,
  useGetSingleUserQuery,
  useGetSuggestedUserQuery,
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useEditProfileMutation,
  useEditProfilePictureMutation,
  useRemoveProfilePictureMutation,
} = userApiSlice;
