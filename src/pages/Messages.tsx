import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../app/features/auth/authSlice";
import { UserType } from "../../types";
import { ModalNewMessage } from "../components";
import { BASE_URL } from "../constants";
import { BsPeopleFill } from "react-icons/bs";
import { RootState } from "../app/store";

const Messages = () => {
  const [showModalNewMessage, setShowModalNewMessage] = useState(false);
  const user = useSelector(selectCurrentUser) as UserType;
  const { conversations, online } = useSelector(
    (state: RootState) => state.socket
  );

  const isOnline = (memberId: string) => {
    return online.includes(memberId);
  };

  return (
    <>
      {showModalNewMessage && (
        <ModalNewMessage
          handleHideModal={() => setShowModalNewMessage(false)}
        />
      )}
      <div className="flex h-[calc(100vh-80px)] sm:h-[calc(100vh-66px)] md:h-screen">
        {/* left side */}
        <div className="w-[fit] md:w-[397px] flex flex-col h-full border border-transparent border-r-grayIg/10 dark:border-r-lightBg/20">
          <div className="flex items-center justify-center md:justify-between p-6 py-8 text-xl ">
            <div className="font-bold hidden md:inline">
              <span>{user.username}</span>
            </div>
            <button
              onClick={() => setShowModalNewMessage(true)}
              className="text-2xl"
            >
              <FiEdit />
            </button>
          </div>
          <div className="hidden px-6 md:flex items-center justify-between">
            <h1 className="text-lg font-bold">Messages</h1>
            {/* <a
              href="#"
              className="text-gray-400 hover:opacity-50 font-semibold text-sm"
            >
              Requests
            </a> */}
          </div>

          <div className="w-full h-full overflow-y-auto">
            {conversations.length < 1 && (
              <div className="hidden w-full h-full md:flex justify-center items-center">
                No messages found.
              </div>
            )}
            {conversations?.map((conversation) => (
              <Link
                to={conversation.roomId}
                key={conversation.roomId}
                className="cursor-pointer"
              >
                <div className="w-full py-2 px-4 md:px-6 flex-shrink-0 flex gap-2 items-center gap-y-1 hover:bg-gray-100/50 dark:hover:bg-lightBg/10">
                  <div className="w-16 h-16 flex-shrink-0 border-2 border-white rounded-full flex justify-center items-center">
                    <div className="w-[91%] h-[91%] rounded-full bg-gray-300">
                      {conversation.members.length === 1 ? (
                        <div className="relative w-full h-full">
                          <img
                            src={`${BASE_URL}/${conversation.members[0].profilePicture}`}
                            alt={conversation.members[0].username}
                            className="w-full h-full object-cover rounded-full overflow-hidden"
                          />
                          {/* online tags */}
                          {isOnline(conversation.members[0]._id) && (
                            <div className="absolute w-3 h-3 border-2 border-white bottom-0 right-0 rounded-full bg-green-500"></div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full text-2xl flex justify-center items-center">
                          <BsPeopleFill />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-bold">
                      {conversation.members?.map((user, idx) => (
                        <span key={user._id}>
                          {user.username}
                          {conversation.members.length === idx + 1 ? "" : ", "}
                        </span>
                      ))}
                    </p>
                    {isOnline(conversation.members[0]._id) && (
                      <p className="text-xs tracking-wide text-gray-400">
                        Active now
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* right side */}
        <div className="flex-1">
          <Outlet
            context={{
              handleShowModalNewMessage: () => setShowModalNewMessage(true),
              conversations,
            }}
          />
        </div>
      </div>
    </>
  );
};

type OutletMessageType = {
  handleShowModalNewMessage?: () => void;
};

export const useMessageOutlet = () => {
  return useOutletContext<OutletMessageType>();
};

export default Messages;
