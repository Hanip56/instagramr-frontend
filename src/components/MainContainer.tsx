import { useDispatch, useSelector } from "react-redux";
import {
  ModalCardOptions,
  ModalOwnCardOptions,
  ModalCreate,
  ModalPost,
} from ".";
import Navbar from "./Navbar";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { RootState } from "../app/store";
import usePreventScroll from "../hooks/usePreventScroll";
import ModalEdit from "./Modals/ModalEdit";
import io from "socket.io-client";
import { BASE_URL } from "../constants";
import { useEffect } from "react";
import {
  ConversationsType,
  addChat,
  addConversations,
  initialSocket,
} from "../app/features/socket/socketSlice";
import { useGetOwnConversationsMutation } from "../app/features/socket/socketApiSlice";

const MainContainer = () => {
  const {
    modalCardOptions,
    modalOwnCardOptions,
    modalPost,
    modalCreate,
    modalEdit,
  } = useSelector((state: RootState) => state.modal);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { socket, conversations } = useSelector(
    (state: RootState) => state.socket
  );

  const [getOwnConversations] = useGetOwnConversationsMutation();

  const location = useLocation();
  const dispatch = useDispatch();

  usePreventScroll([
    modalCardOptions,
    modalPost,
    modalCreate,
    modalOwnCardOptions,
    modalEdit,
  ]);

  // initial socket
  useEffect(() => {
    if (!user?._id) return;
    const socket = io(BASE_URL, { query: { id: user._id } });
    socket.emit("addUser");
    socket.on("getOnlineUsers", (users) => {
      dispatch(initialSocket({ users }));
    });
    const fetchConversations = async () => {
      // fetch here
      let conversations: ConversationsType[] = [];
      const res = await getOwnConversations();
      if ("data" in res) {
        conversations = res.data;
      }
      dispatch(initialSocket({ socket, conversations: conversations }));
    };
    fetchConversations();

    return () => {
      socket.close();
    };
  }, [user?._id, dispatch]);

  // create receive-message handler
  useEffect(() => {
    if (socket) {
      socket?.on(
        "receive-message",
        ({ roomId, members, sender, text, createdAt }) => {
          const preChat = {
            userId: sender._id,
            text,
            createdAt,
          };
          if (
            // if conversations already exist
            conversations.some((conversation) => conversation.roomId === roomId)
          ) {
            if (preChat) {
              dispatch(addChat({ roomId, preChat }));
            }
            return;
          } else {
            dispatch(
              addConversations({
                newMembers: members,
                preRoomId: roomId,
                preChat,
              })
            );
          }
        }
      );
    }

    return () => {
      socket?.off("receive-message");
    };
  }, [socket, conversations, dispatch]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  const regexForMessagePage = new RegExp(/^\/direct(?:\/(.*))?$/);

  return (
    <>
      {modalCardOptions && <ModalCardOptions />}
      {modalOwnCardOptions && <ModalOwnCardOptions />}
      {modalPost && <ModalPost />}
      {modalEdit && <ModalEdit />}
      {modalCreate && <ModalCreate />}

      <ScrollRestoration getKey={(location) => location.pathname} />
      <div className="flex text-lightText dark:text-darkText">
        <Navbar />
        {/* main */}
        <div
          className={`ml-0 pb-16 md:pb-0 md:ml-[4.5rem] flex-1 min-h-[calc(100vh-45px)] md:min-h-screen ${
            location.pathname.match(regexForMessagePage) ? "" : "lg:ml-[244px]"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainContainer;
