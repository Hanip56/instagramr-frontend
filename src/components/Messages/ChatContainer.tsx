import {
  BsCameraVideo,
  BsHeart,
  BsImage,
  BsInfoCircle,
  BsMic,
  BsPeopleFill,
  BsPerson,
  BsTelephone,
} from "react-icons/bs";
import { Navigate, useParams } from "react-router-dom";
import { VscSmiley } from "react-icons/vsc";
import { BASE_URL } from "../../constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserType } from "../../../types";
import { selectCurrentUser } from "../../app/features/auth/authSlice";
import { addChat } from "../../app/features/socket/socketSlice";

const ChatContainer = () => {
  const { conversations } = useSelector((state: RootState) => state.socket);
  const [text, setText] = useState("");
  const { roomId } = useParams();
  const { socket } = useSelector((state: RootState) => state.socket);
  const user = useSelector(selectCurrentUser) as UserType;
  const dispatch = useDispatch();

  const conversation = conversations.find((c) => c.roomId === roomId);

  const handleSendMessage = () => {
    socket?.emit(
      "send-message",
      {
        roomId,
        recipients: conversation?.members,
        sender: {
          _id: user._id,
          username: user.username,
          slug: user.slug,
          profilePicture: user.profilePicture,
          fullname: user.fullname,
        },
        text,
      },
      (act: { success: boolean; createdAt: Date }) => {
        if (act.success) {
          const preChat = {
            userId: user._id,
            text,
            createdAt: act.createdAt,
          };
          dispatch(addChat({ roomId, preChat }));
        } else {
          console.log("Failed to deliver message");
        }
      }
    );

    setText("");
  };

  if (!conversation) {
    return <Navigate to={"/direct"} replace />;
  }

  const single = conversation.members.length === 1;

  const chatEl = () => {
    return conversation.chats?.map((chat, idx) =>
      chat.userId === user._id ? (
        <div
          key={idx}
          className="p-3 rounded-full bg-blue-500 self-end text-white flex-shrink-0"
        >
          {chat.text}
        </div>
      ) : (
        <div key={idx} className="flex gap-2 flex-shrink-0">
          <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center mt-[5px]">
            <BsPerson />
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-full bg-gray-100 dark:bg-semigrayIg self-start">
              {chat.text}
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <header className="w-full flex justify-between items-center p-4">
        <div>
          <div className="w-full flex-shrink-0 flex gap-3 items-center gap-y-1 hover:bg-gray-100/50 dark:hover:bg-lightBg/10">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              {single ? (
                <img
                  src={`${BASE_URL}/${conversation.members[0].profilePicture}`}
                  alt={conversation.members[0].username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full text-2xl flex justify-center items-center">
                  <BsPeopleFill />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-bold">
                {conversation.members
                  .map((member) => member.username)
                  .join(", ")}
              </p>
              <p className="text-xs tracking-wide text-gray-400">Info</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-2xl">
          <span>
            <BsTelephone />
          </span>
          <span>
            <BsCameraVideo />
          </span>
          <span>
            <BsInfoCircle />
          </span>
        </div>
      </header>
      <main className="w-full flex-1 overflow-y-auto p-4 border border-transparent border-t-grayIg/10 dark:border-t-lightBg/20">
        <div className="w-full flex flex-col gap-4 justify-center items-center my-8">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200">
            {single ? (
              <img
                src={`${BASE_URL}/${conversation.members[0].profilePicture}`}
                alt={conversation.members[0].username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full text-5xl flex justify-center items-center">
                <BsPeopleFill />
              </div>
            )}
          </div>
          <span className="font-semibold text-lg">
            {" "}
            {conversation.members.map((member) => member.username).join(", ")}
          </span>
          {single && <button className="igButton">View profile</button>}
        </div>

        {/* chat */}
        <div className="w-full flex flex-col gap-2">{chatEl()}</div>
      </main>
      <footer className="w-full p-4">
        <div className="p-3 px-4 flex gap-2 items-center border border-grayIg/10 dark:border-lightBg/20 rounded-full">
          <span className="text-2xl">
            <VscSmiley />
          </span>
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 text-sm bg-transparent outline-none"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          {text && (
            <button
              onClick={handleSendMessage}
              className="text-sm text-blue-400 hover:text-lightText dark:hover:text-darkText font-semibold"
            >
              Send
            </button>
          )}
          {!text && (
            <div className="flex gap-4 text-2xl mr-3">
              <span>
                <BsMic />
              </span>
              <span>
                <BsImage />
              </span>
              <span>
                <BsHeart />
              </span>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default ChatContainer;
