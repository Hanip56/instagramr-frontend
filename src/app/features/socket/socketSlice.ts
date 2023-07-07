import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { UserShortType } from "../../../../types";
import { customAlphabet } from "nanoid";

export type ChatType = {
  userId: string;
  text: string;
  createdAt: Date;
};

export type ConversationsType = {
  roomId: string;
  members: UserShortType[];
  chats: ChatType[];
};

type InitialStateType = {
  socket: Socket | null;
  conversations: ConversationsType[];
};

const initialState: InitialStateType = {
  socket: null,
  conversations: [],
};

type AddConversationsType = {
  newMembers: UserShortType[];
  preRoomId?: string;
  preChat?: ChatType;
};

const nanoId = customAlphabet("1234567890", 10);

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initialSocket: (state, action) => {
      const { socket, conversations } = action.payload;
      if (socket) {
        state.socket = socket;
      }
      if (conversations) {
        state.conversations = conversations;
      }
    },
    addChat: (state, action) => {
      const { roomId, preChat } = action.payload;
      state.conversations = state.conversations.map((conversation) =>
        conversation.roomId === roomId
          ? { ...conversation, chats: [...conversation.chats, preChat] }
          : conversation
      );
    },
    addConversations: (state, action: PayloadAction<AddConversationsType>) => {
      // newMembers: UserShortType[], preRoomId?: string, preChat?: ChatType
      const { newMembers, preRoomId, preChat } = action.payload;
      let roomId = "";
      let chats: ChatType[] = [];

      if (preRoomId) {
        roomId = preRoomId;
      } else {
        roomId = nanoId();
      }

      if (preChat) {
        chats = [preChat];
      }

      if (
        state.conversations.length > 0 &&
        state.conversations.some(({ members }) => {
          if (members.length !== newMembers.length) return false;
          return members.every((m) =>
            newMembers.map((member) => member._id).includes(m._id)
          );
        })
      ) {
        return;
      } else {
        state.conversations.push({ roomId, members: newMembers, chats });
      }
    },
  },
});

export const { initialSocket, addChat, addConversations } = socketSlice.actions;

export default socketSlice.reducer;
