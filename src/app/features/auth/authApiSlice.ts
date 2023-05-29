import { UserType } from "../../../../types";
import apiSlice from "../../api/api";

type AuthResponse = {
  user: UserType;
  token: string;
};

export type RegisterArgs = {
  username: string;
} & LoginArgs;

export type LoginArgs = {
  email: string;
  password: string;
};

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterArgs>({
      query: (credentials) => ({
        url: "/api/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginArgs>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => "/api/auth/logout",
    }),
    refresh: builder.mutation<AuthResponse, void>({
      query: () => "/api/auth/refresh",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
