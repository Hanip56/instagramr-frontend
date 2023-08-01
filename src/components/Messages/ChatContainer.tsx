import { BsInfoCircle, BsInfoCircleFill, BsPeopleFill } from "react-icons/bs";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { VscSmiley } from "react-icons/vsc";
import { BASE_URL } from "../../constants";
import { useState, useRef, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserType } from "../../../types";
import { selectCurrentUser } from "../../app/features/auth/authSlice";
import {
  ConversationsType,
  addChat,
  deleteConversationState,
} from "../../app/features/socket/socketSlice";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  useDeleteConversationMutation,
  useSendMessageMutation,
} from "../../app/features/socket/socketApiSlice";

const ChatContainer = () => {
  const { conversations } = useSelector((state: RootState) => state.socket);
  const [text, setText] = useState("");
  const { roomId } = useParams();
  const { socket } = useSelector((state: RootState) => state.socket);
  const user = useSelector(selectCurrentUser) as UserType;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const emojiBoxRef = useRef<HTMLDivElement>(null);
  const conversation = conversations.find(
    (c) => c.roomId === roomId
  ) as ConversationsType;

  const [sendMessage, { isLoading: sendMessageLoading }] =
    useSendMessageMutation();
  const [deleteConversation, { isSuccess: deleteSuccess }] =
    useDeleteConversationMutation();

  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    await sendMessage({ roomId: roomId ?? "", message: text });

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

  const handleDeleteConversation = async () => {
    await deleteConversation(roomId ?? "");
  };

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(deleteConversationState({ roomId }));
      navigate("/direct", { replace: true });
    }
  }, [deleteSuccess]);

  const addEmoji = (emojiData: any) => {
    const emoji = String.fromCodePoint(
      ...emojiData.unified.split("-").map((hex: any) => parseInt(hex, 16))
    );
    setText((prevText) => prevText + emoji);
  };

  useOutsideAlerter(emojiBoxRef, setShowEmojiBox);

  if (!conversation) {
    return <Navigate to={"/direct"} replace />;
  }

  const single = conversation.members.length === 1;

  const chatEl = () => {
    return conversation.chats?.map((chat, idx) =>
      chat.userId === user._id ? (
        <div
          key={idx}
          className="p-3 rounded-full bg-blue-500 self-end text-white flex-shrink-0 text-sm"
        >
          {chat.text}
        </div>
      ) : (
        <div key={idx} className="flex gap-2 flex-shrink-0 text-sm">
          <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center mt-[5px]">
            <img
              src={`${BASE_URL}/${
                conversation.members?.filter(
                  (member) => member._id === chat.userId
                )[0].profilePicture
              }`}
              className="w-full h-full object-cover"
            />
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
    <div className="flex justify-center h-full divide-x divide-black/10 dark:divide-white/20">
      <div className="flex-1 h-full flex flex-col justify-center items-center">
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
            {/* <span>
              <BsTelephone />
            </span>
            <span>
              <BsCameraVideo />
            </span> */}
            <button onClick={() => setShowDetail((prev) => !prev)}>
              {showDetail ? <BsInfoCircleFill /> : <BsInfoCircle />}
            </button>
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
          <form
            onSubmit={handleSubmitMessage}
            className="relative p-3 px-4 flex gap-2 items-center border border-grayIg/10 dark:border-lightBg/20 rounded-full"
          >
            {showEmojiBox && (
              <div className="absolute bottom-12 left-0" ref={emojiBoxRef}>
                <Picker
                  data={data}
                  onEmojiSelect={addEmoji}
                  theme={"light"}
                  emojiButtonSize={30}
                  emojiSize={16}
                />
              </div>
            )}
            <button
              type="button"
              className="text-2xl"
              onClick={() => setShowEmojiBox((prev) => !prev)}
            >
              <VscSmiley />
            </button>
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 text-sm bg-transparent outline-none"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            {text && (
              <button
                type="submit"
                disabled={sendMessageLoading}
                className="text-sm text-blue-400 hover:text-lightText dark:hover:text-darkText font-semibold"
              >
                Send
              </button>
            )}
            {/* {!text && (
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
            )} */}
          </form>
        </footer>
      </div>
      {/* detail info */}
      {showDetail && (
        <div className="basis-80 flex flex-col divide-y divide-black/10 dark:divide-white/20">
          <h1 className="text-xl font-semibold px-6 py-8">Details</h1>
          <div>
            <h2 className="text-base font-semibold p-6">Members</h2>
            {conversation.members?.map((member) => (
              <Link
                key={member._id}
                to={`/${member.slug}`}
                className="w-full flex-shrink-0 flex gap-3 items-center gap-y-1 hover:bg-gray-100/50 dark:hover:bg-lightBg/10 px-6 py-2"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={`${BASE_URL}/${member.profilePicture}`}
                    alt={member.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">{member.username}</p>
                  <p className="text-xs tracking-wide text-gray-400">
                    {member.fullname}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="p-6">
            <button
              onClick={handleDeleteConversation}
              className="text-red-400 self-start"
            >
              Delete chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
