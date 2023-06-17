import { UserShortType, UserType } from "../../../../types";
import apiSlice from "../../api/api";

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
    }),
    removeProfilePicture: builder.mutation({
      query: () => ({
        url: "/api/user/edit/profilePicture",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFindUserQuery,
  useGetSingleUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useEditProfileMutation,
  useEditProfilePictureMutation,
  useRemoveProfilePictureMutation,
} = userApiSlice;
