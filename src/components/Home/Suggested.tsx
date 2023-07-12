import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "..";
import {
  useFollowUserMutation,
  useGetSuggestedUserQuery,
  useUnfollowUserMutation,
} from "../../app/features/user/userApiSlice";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  followUserState,
  selectCurrentUser,
  unfollowUserState,
} from "../../app/features/auth/authSlice";
import { useCallback } from "react";
import apiSlice from "../../app/api/api";
import { resetPageFollowingPost } from "../../app/features/post/postSlice";

const Suggested = () => {
  const { data: suggestedUsers, isLoading } = useGetSuggestedUserQuery();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

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

  useEffect(() => {
    dispatch(apiSlice.util.invalidateTags(["FollowingPost"]));
    dispatch(resetPageFollowingPost());

    return () => {
      dispatch(apiSlice.util.resetApiState());
    };
  }, []);

  console.log({ isLoading, suggestedUsers });

  if (isLoading) return <Spinner />;

  return (
    <div
      className={`max-w-lg mx-auto flex flex-col h-screen pt-20 md:pt-10 gap-4`}
    >
      <h1 className="font-semibold">Suggested for you</h1>
      <main className="border dark:border-white/20 rounded-md shadow-lg">
        {!isLoading &&
          suggestedUsers?.map((suggesstedUser) => (
            <div
              key={suggesstedUser._id}
              className="w-full flex-shrink-0 flex gap-4 px-4 py-3 items-center gap-y-1"
            >
              <Link
                to={`/${suggesstedUser.slug}`}
                className="flex gap-4 items-center"
              >
                <div className="w-12 h-12 border border-white rounded-full flex justify-center items-center">
                  <div className="w-[95%] h-[95%] rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={`${BASE_URL}/${suggesstedUser.profilePicture}`}
                      alt={suggesstedUser.slug}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {suggesstedUser.username}
                  </p>
                  <p className="text-xs tracking-widest text-gray-400">
                    <span>{suggesstedUser?.fullname}</span>
                  </p>
                </div>
              </Link>
              {suggesstedUser._id !== user._id && (
                <>
                  {suggesstedUser._id !== user._id &&
                  isFollowed(suggesstedUser._id) ? (
                    <button
                      onClick={() => handleUnfollow(suggesstedUser._id)}
                      className="igButton ml-auto"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(suggesstedUser._id)}
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
  );
};

export default Suggested;
