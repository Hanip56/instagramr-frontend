import { useDispatch, useSelector } from "react-redux";
import { hideModalCardOptions } from "../../app/features/modal/modalSlice";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/features/user/userApiSlice";
import {
  followUserState,
  selectCurrentUser,
  unfollowUserState,
} from "../../app/features/auth/authSlice";
import { PostType, UserType } from "../../../types";
import { RootState } from "../../app/store";

const ModalCardOptions = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser) as UserType;
  const post = useSelector(
    (state: RootState) => state.modal.modalPayload
  ) as PostType;

  const isFollowed = user.followings.includes(post?.postedBy._id ?? "");

  const [unfollow] = useUnfollowUserMutation();
  const [follow] = useFollowUserMutation();

  const handleHideModal = () => {
    dispatch(hideModalCardOptions());
  };

  const handleUnfollow = async () => {
    const res = await unfollow({
      userId: user._id,
      targetId: post?.postedBy._id,
    });
    if ("data" in res) {
      dispatch(unfollowUserState(post?.postedBy._id));
      dispatch(hideModalCardOptions());
    }
  };

  const handleFollow = async () => {
    const res = await follow({
      userId: user._id,
      targetId: post?.postedBy._id,
    });
    if ("data" in res) {
      dispatch(followUserState(post?.postedBy._id));
      dispatch(hideModalCardOptions());
    }
  };

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-lg">
        <div className="w-[80vw] xs:w-[25rem] bg-white dark:bg-grayIg rounded-lg overflow-hidden flex flex-col divide-y-[1px] divide-darkBg/10 dark:divide-white/10 text-sm animate-fadeIn text-lightText dark:text-darkText">
          {/* <button className="w-full py-3 active:bg-gray-300/30 ">Open</button> */}
          {isFollowed && (
            <button
              className="w-full py-3 active:bg-gray-300/30 text-red-500 font-semibold"
              onClick={handleUnfollow}
            >
              Unfollow
            </button>
          )}
          {!isFollowed && (
            <button
              className="w-full py-3 active:bg-gray-300/30 text-red-500 font-semibold"
              onClick={handleFollow}
            >
              Follow
            </button>
          )}
          <button
            className="w-full py-3 active:bg-gray-300/30"
            onClick={handleHideModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalCardOptions;
