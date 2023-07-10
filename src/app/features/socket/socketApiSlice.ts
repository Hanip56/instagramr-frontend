import { UserShortType } from "../../../../types";
import apiSlice from "../../api/api";
import { ConversationsType } from "./socketSlice";

type SendMessageArg = {
  roomId: string;
  message: string;
};

type CreateConversationArg = {
  roomId: string;
  members: string[];
};

const socketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnConversations: builder.mutation<ConversationsType[], void>({
      query: () => "/api/conversation/user",
    }),
    getConversationByMembers: builder.mutation<ConversationsType[], string>({
      query: (members) => `/api/conversation?members=${members}`,
    }),
    sendMessage: builder.mutation<ConversationsType, SendMessageArg>({
      query: ({ roomId, message }) => ({
        url: `/api/conversation/${roomId}`,
        method: "PUT",
        body: { message },
      }),
    }),
    createConversation: builder.mutation<
      ConversationsType,
      CreateConversationArg
    >({
      query: (conversationInfo) => ({
        url: `/api/conversation`,
        method: "POST",
        body: conversationInfo,
      }),
    }),
    deleteConversation: builder.mutation<string, string>({
      query: (roomId) => ({
        url: `/api/conversation/${roomId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOwnConversationsMutation,
  useGetConversationByMembersMutation,
  useSendMessageMutation,
  useCreateConversationMutation,
  useDeleteConversationMutation,
} = socketApiSlice;
