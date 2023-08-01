import { Link } from "react-router-dom";
import { BsXLg } from "react-icons/bs";
import { BASE_URL } from "../../constants";
import {
  useFollowUserMutation,
  useGetFollowersQuery,
  useUnfollowUserMutation,
} from "../../app/features/user/userApiSlice";
import { Spinner } from "..";
import { useDispatch, useSelector } from "react-redux";
import {
  followUserState,
  selectCurrentUser,
  unfollowUserState,
} from "../../app/features/auth/authSlice";
import { UserType } from "../../../types";
import { useCallback } from "react";

type PropTypes = {
  hide: () => void;
  slug: string;
};

const ModalFollowers = ({ hide, slug }: PropTypes) => {
  const user = useSelector(selectCurrentUser) as UserType;
  const { data: followers, isLoading } = useGetFollowersQuery(slug);
  const dispatch = useDispatch();

  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  const handleHideModal = () => {
    hide();
  };

  const isFollowed = useCallback(
    (targetId: string) => {
      return user.followings.includes(targetId);
    },
    [user]
  );

  const handleFollow = async (targetId: string) => {
    const res = await follow({
      userId: user._id,
      targetId,
    });
    if ("data" in res) {
      dispatch(followUserState(targetId));
    }
  };
  const handleUnfollow = async (targetId: string) => {
    const res = await unfollow({
      userId: user._id,
      targetId,
    });
    if ("data" in res) {
      dispatch(unfollowUserState(targetId));
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
          <header className="flex items-center justify-between text-center p-3 px-4 font-semibold">
            <span className="basis-4"></span>
            <span>Followers</span>
            <button onClick={hide} className="text-xl basis-4">
              <BsXLg />
            </button>
          </header>
          <main className="basis-80 overflow-y-scroll">
            {isLoading && <Spinner />}
            {!isLoading &&
              followers?.map((follower) => (
                <div
                  key={follower._id}
                  className="w-full flex-shrink-0 flex gap-4 px-6 py-2 items-center gap-y-1"
                >
                  <Link
                    to={`/${follower.slug}`}
                    onClick={hide}
                    className="flex gap-4 items-center"
                  >
                    <div className="w-12 h-12 border border-white rounded-full flex justify-center items-center">
                      <div className="w-[95%] h-[95%] rounded-full overflow-hidden bg-gray-300">
                        <img
                          src={`${BASE_URL}/${follower.profilePicture}`}
                          alt={follower.slug}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {follower.username}
                      </p>
                      <p className="text-xs tracking-widest text-gray-400">
                        <span>{follower?.fullname}</span>
                      </p>
                    </div>
                  </Link>
                  {follower._id !== user._id && (
                    <>
                      {follower._id !== user._id && isFollowed(follower._id) ? (
                        <button
                          onClick={() => handleUnfollow(follower._id)}
                          className="igButton ml-auto"
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          onClick={() => handleFollow(follower._id)}
                          className="igButtonBlue ml-auto"
                        >
                          Follow
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
          </main>
        </div>
      </div>
    </>
  );
};

export default ModalFollowers;
