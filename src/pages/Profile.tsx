import { BsBookmark, BsGearWide, BsThreeDots } from "react-icons/bs";
import { MdOutlineGridOn, MdOutlinePersonPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import {
  followUserState,
  selectCurrentUser,
  unfollowUserState,
} from "../app/features/auth/authSlice";
import { UserType } from "../../types";
import { BASE_URL } from "../constants";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useUnfollowUserMutation,
} from "../app/features/user/userApiSlice";
import {
  Footer,
  ModalFollowers,
  ModalFollowings,
  ModalGearProfile,
} from "../components";
import { useState } from "react";
import { showModalCardOptions } from "../app/features/modal/modalSlice";

const Profile = () => {
  const [showModalGearProfile, setShowModalGearProfile] = useState(false);
  const [showModalFollowers, setShowModalFollowers] = useState(false);
  const [showModalFollowings, setShowModalFollowings] = useState(false);
  const location = useLocation();
  const user = useSelector(selectCurrentUser) as UserType;
  const dispatch = useDispatch();

  const currentSlug = location.pathname.split("/")[1];
  const section = location.pathname.split("/")[2];
  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  const { data: shownUser, isLoading } = useGetSingleUserQuery(currentSlug);

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

  if (isLoading) {
    return (
      <div className="max-w-[1013px] px-0 md:px-4 mx-auto flex flex-col pt-6">
        <header className="max-w-[935px] py-2 px-2 md:px-6 flex flex-col gap-6 mb-6 md:mb-12">
          <div className="w-full flex gap-6 items-center gap-y-10">
            <div className="md:basis-[35%] flex justify-center items-center">
              <div className="w-24 h-24 md:w-36 md:h-36 flex-shrink-0 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-full flex justify-center items-center"></div>
            </div>
            <div className="md:block flex-1 space-y-4 md:space-y-7 md:pt-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-6 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-md"></div>
                <div className="w-20 h-6 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-md"></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-20 h-6 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-md"></div>
                <div className="w-20 h-6 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-md"></div>
                <div className="w-20 h-6 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-md"></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-24 h-6 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  const isFollowed = user.followings.includes(shownUser?._id ?? "");
  const isOwnUser = user.slug === currentSlug;

  const profileButtonsContainer = () => {
    if (isOwnUser) {
      return (
        <Link to="/accounts/edit" className="igButton">
          <span>Edit Profile</span>
        </Link>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          {isFollowed ? (
            <button
              onClick={() => handleUnfollow(shownUser?._id ?? "")}
              className="igButton"
            >
              <span>followings</span>
            </button>
          ) : (
            <button
              onClick={() => handleFollow(shownUser?._id ?? "")}
              className="igButtonBlue"
            >
              <span>Follow</span>
            </button>
          )}
          <Link to={"/direct"} className="igButton">
            <span>Message</span>
          </Link>
          {/* <button className="igButton text-xl">
            <BiUserPlus />
          </button> */}
        </div>
      );
    }
  };

  return (
    <>
      {showModalGearProfile && (
        <ModalGearProfile hide={() => setShowModalGearProfile(false)} />
      )}
      {showModalFollowers && (
        <ModalFollowers
          hide={() => setShowModalFollowers(false)}
          slug={shownUser?.slug ?? ""}
        />
      )}
      {showModalFollowings && (
        <ModalFollowings
          hide={() => setShowModalFollowings(false)}
          slug={shownUser?.slug ?? ""}
        />
      )}

      <div className="max-w-[1013px] px-0 md:px-4 mx-auto flex flex-col pt-6">
        <header className="max-w-[935px] py-2 px-2 md:px-6 flex flex-col gap-6 mb-6 md:mb-12">
          <div className="w-full flex gap-6 items-center gap-y-10">
            <div className="md:basis-[35%] flex justify-center items-center">
              <div className="w-24 h-24 md:w-36 md:h-36 flex-shrink-0 border-2 border-white rounded-full flex justify-center items-center">
                <div className="w-[91%] h-[91%] rounded-full bg-gray-300 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`${BASE_URL}/${shownUser?.profilePicture}`}
                    alt={shownUser?.username}
                  />
                </div>
              </div>
            </div>

            <div className="md:block flex-1 space-y-4 md:space-y-7 md:pt-6">
              <div className="flex items-center gap-6">
                {/* username */}
                <span>{shownUser?.username}</span>
                <div className="hidden md:block">
                  {profileButtonsContainer()}
                </div>
                {!isOwnUser && (
                  <button
                    onClick={() =>
                      dispatch(
                        showModalCardOptions({
                          postedBy: { _id: shownUser?._id },
                        })
                      )
                    }
                    className="text-2xl"
                  >
                    <BsThreeDots />
                  </button>
                )}
                {isOwnUser && (
                  <button
                    className="text-2xl"
                    onClick={() => setShowModalGearProfile(true)}
                  >
                    <BsGearWide />
                  </button>
                )}
              </div>
              {/* status */}
              <ul className="hidden md:flex gap-12 text-base">
                <li>
                  <span className="font-bold">{shownUser?.totalPost}</span>{" "}
                  <span>posts</span>
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => setShowModalFollowers(true)}
                >
                  <span className="font-bold">{shownUser?.totalFollowers}</span>{" "}
                  <span>followers</span>
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => setShowModalFollowings(true)}
                >
                  <span className="font-bold">
                    {shownUser?.totalFollowings}
                  </span>{" "}
                  <span>following</span>
                </li>
              </ul>
              {/* buttons container for mobile screen */}
              <div className="block md:hidden">{profileButtonsContainer()}</div>
              {/* bio */}
              <div className="hidden md:block text-sm leading-6">
                <b>{shownUser?.fullname}</b>
                <br />
                <p>{shownUser?.profileBio}</p>
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <p>{shownUser?.profileBio}</p>
          </div>
        </header>

        {/* status info for small screen */}
        <ul className="flex py-4 text-sm md:hidden gap-12 border border-transparent border-t-grayIg/10 dark:border dark:border-t-lightBg/20 text-center">
          <li className="flex-1">
            <span className="font-bold">{shownUser?.totalPost}</span> <br />
            <span>posts</span>
          </li>
          <li className="flex-1">
            <span className="font-bold">{shownUser?.totalFollowers}</span>{" "}
            <br />
            <span>followers</span>
          </li>
          <li className="flex-1">
            <span className="font-bold">{shownUser?.totalFollowings}</span>
            <br /> <span>following</span>
          </li>
        </ul>
        {/* section navigation*/}
        <div className="w-full flex items-center md:justify-center text-xs font-semibold md:gap-24 border border-transparent border-t-grayIg/10 dark:border dark:border-t-lightBg/20">
          <Link
            to=""
            className={`flex-1 md:flex-grow-0 py-4 flex justify-center gap-2 items-center border-2 border-transparent ${
              section === undefined
                ? "border-t-darkBg dark:border-t-lightBg"
                : ""
            }`}
          >
            <span>
              <MdOutlineGridOn />
            </span>
            <span>POSTS</span>
          </Link>
          {isOwnUser && (
            <Link
              to="saved"
              className={`flex-1 md:flex-grow-0 py-4 flex justify-center gap-2 items-center border-2 border-transparent ${
                section === "saved"
                  ? "border-t-darkBg dark:border-t-lightBg"
                  : ""
              }`}
            >
              <span>
                <BsBookmark />
              </span>
              <span>SAVED</span>
            </Link>
          )}
          <Link
            to="tagged"
            className={`flex-1 md:flex-grow-0 py-4 flex justify-center gap-2 items-center border-2 border-transparent ${
              section === "tagged"
                ? "border-t-darkBg dark:border-t-lightBg"
                : ""
            }`}
          >
            <span className="text-lg">
              <MdOutlinePersonPin />
            </span>
            <span>TAGGED</span>
          </Link>
        </div>
        <Outlet context={{ user: shownUser, isOwnUser }} />

        <Footer />
      </div>
    </>
  );
};

type OutletContextType = {
  user: UserType | undefined;
  isOwnUser: boolean;
};

export const useShownUser = () => {
  return useOutletContext<OutletContextType>();
};

export default Profile;
