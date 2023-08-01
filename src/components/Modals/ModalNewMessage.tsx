import { useState } from "react";
import { BsX } from "react-icons/bs";
import { useFindUserQuery } from "../../app/features/user/userApiSlice";
import { BASE_URL } from "../../constants";
import { IoCheckmark } from "react-icons/io5";
import { UserShortType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { addConversations } from "../../app/features/socket/socketSlice";
import { selectCurrentUser } from "../../app/features/auth/authSlice";
import { useCreateConversationMutation } from "../../app/features/socket/socketApiSlice";
import { customAlphabet } from "nanoid";

type PropTypes = {
  handleHideModal: () => void;
};

const ModalNewMessage = ({ handleHideModal }: PropTypes) => {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserShortType[]>([]);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const nanoId = customAlphabet("0123456789", 10);

  const [createConversation] = useCreateConversationMutation();

  const { data: searchedUsers, isLoading } = useFindUserQuery(search);

  const handleAddSelectedUser = (userInfo: UserShortType) => {
    if (userInfo._id === user._id) {
      console.log("You can't add yourself!");
      return;
    }

    setSelectedUsers((prev) => {
      if (prev.find((u) => u._id === userInfo._id)) {
        return prev.filter((u) => u._id !== userInfo._id);
      } else {
        return [...prev, userInfo];
      }
    });
  };

  const handleRemoveSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleSubmit = async () => {
    const members = selectedUsers.map((member) => member._id);
    const res = await createConversation({ members, roomId: nanoId() });

    if ("data" in res) {
      const conversation = res.data;
      dispatch(
        addConversations({
          newMembers: conversation.members,
          preRoomId: conversation.roomId,
        })
      );
    }

    handleHideModal();
  };

  return (
    <div className="fixed z-50">
      <div
        className="fixed w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-lg">
        <div className="w-screen h-screen md:w-[32rem] md:h-[32rem] bg-lightBg dark:bg-grayIg rounded-xl divide-y divide-black/10 dark:divide-white/10 flex flex-col animate-fadeIn">
          <header className="flex justify-between items-center p-3">
            <span className="basis-6"></span>
            <span className="font-semibold">New message</span>
            <button
              className="basis-6 flex justify-center items-center"
              onClick={handleHideModal}
            >
              <span className="text-3xl">
                <BsX />
              </span>
            </button>
          </header>
          <div className="p-6">
            <div className="w-full flex flex-wrap items-center gap-y-4 gap-x-2 text-sm">
              <span className="font-semibold">To: </span>
              {selectedUsers?.map((user) => (
                <div
                  key={user._id}
                  className="bg-blue-500/20 dark:bg-lightBg text-blue-400 dark:text-lightText px-3 py-[2px] rounded-xl flex items-center gap-2 cursor-pointer hover:opacity-75"
                  onClick={() => handleRemoveSelectedUser(user._id)}
                >
                  <span className="font-semibold">{user.username}</span>
                  <span className="text-lg">
                    <BsX />
                  </span>
                </div>
              ))}
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm flex-1 outline-none indent-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="py-4 flex-1 overflow-y-scroll">
            {!isLoading && (searchedUsers ?? []).length < 1 && (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-sm text-gray-400">No account found.</p>
              </div>
            )}
            {!isLoading &&
              searchedUsers?.map((user) => (
                <div key={user._id}>
                  <div
                    className="w-full flex-shrink-0 flex gap-3 px-5 py-2 items-center gap-y-1 hover:bg-black/[.03] dark:hover:bg-white/[.08] cursor-pointer"
                    onClick={() =>
                      handleAddSelectedUser({
                        username: user.username,
                        _id: user._id,
                        slug: user.slug,
                        fullname: user.fullname,
                        profilePicture: user.profilePicture,
                      })
                    }
                  >
                    <div className="w-12 h-12 border-2 border-white rounded-full flex justify-center items-center">
                      <div className="w-[91%] h-[91%] rounded-full overflow-hidden bg-gray-300">
                        <img
                          src={`${BASE_URL}/${user.profilePicture}`}
                          alt={user.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">{user.username}</p>
                      <p className="text-xs text-gray-400">
                        <span>{user?.fullname}</span>
                        <span>
                          {" "}
                          - {user.totalFollowers}{" "}
                          {user.totalFollowers > 1 ? "followers" : "follower"}
                        </span>
                      </p>
                    </div>
                    {/* selected user sign */}
                    <div className="w-6 h-6 ml-auto">
                      {selectedUsers.find((u) => u._id === user._id) ? (
                        <div className="w-full h-full bg-blue-500 flex justify-center items-center rounded-full text-white">
                          <IoCheckmark />
                        </div>
                      ) : (
                        <div className="w-full h-full border border-black dark:border-white rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="p-6">
            <button
              className={`igButtonBlue w-full h-full ${
                selectedUsers.length < 1 ? "opacity-30" : "opacity-100"
              }`}
              disabled={selectedUsers.length < 1}
              onClick={handleSubmit}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNewMessage;
