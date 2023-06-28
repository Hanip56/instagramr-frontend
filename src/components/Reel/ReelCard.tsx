import { forwardRef, useState, useRef } from "react";
import { PostType, UserShortType, UserType } from "../../../types";
import { BASE_URL } from "../../constants";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import {
  BsBookmark,
  BsChat,
  BsFillPlayFill,
  BsThreeDots,
} from "react-icons/bs";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoHeartOutline,
  IoHeartSharp,
  IoPaperPlaneOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  followUserState,
  selectCurrentUser,
  unfollowUserState,
} from "../../app/features/auth/authSlice";
import {
  useLikeAndUnlikeMutation,
  useSaveAndUnsaveMutation,
} from "../../app/features/post/postApiSlice";
import { useNavigate } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/features/user/userApiSlice";
import { ReelCommentCard } from "..";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { showModalCardOptions } from "../../app/features/modal/modalSlice";

type PropTypes = {
  reel: PostType;
  i: number;
  cardSize: {
    w: number;
    h: number;
    m: number;
  };
  reelMuted: boolean;
  handleSound: () => void;
  handleLength: () => void;
};

type CommentType = {
  _id: string;
  user: UserShortType;
  comment: string;
};

const ReelCard = forwardRef<HTMLVideoElement[], PropTypes>(
  ({ reel, i, cardSize, reelMuted, handleSound, handleLength }, ref) => {
    const [reelPlay, setReelPlay] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [arrayCommentsTemp, setArrayCommentsTemp] = useState(
      [...reel.comments].reverse()
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser) as UserType;
    const liked = reel?.likes.some((u) => u._id === user._id);
    const saved = reel?.savedBy.some((u) => u === user._id);
    const totalLikes = reel?.likes.length;

    console.log({ saved: reel.savedBy });

    const [likeAndUnlike] = useLikeAndUnlikeMutation();
    const [follow] = useFollowUserMutation();
    const [unfollow] = useUnfollowUserMutation();
    const [saveAndUnsave] = useSaveAndUnsaveMutation();

    const isOwnUser = reel?.postedBy._id === user._id;

    const isFollowed = user.followings.includes(reel?.postedBy._id ?? "");

    const handlePlay = () => {
      if (ref && "current" in ref && ref.current && ref.current[i]) {
        if (reelPlay) {
          ref.current[i].pause();
        } else {
          ref.current[i].play();
        }
      }
    };

    const handleSave = async () => {
      await saveAndUnsave({
        postId: reel?._id ?? "",
        userId: user?._id,
      });
    };

    const handleLoves = async () => {
      await likeAndUnlike({
        postId: reel?._id ?? "",
        user: {
          _id: user?._id,
          username: user?.username,
          profilePicture: user?.profilePicture,
          slug: user?.slug,
        },
      });
    };

    const handleNavigateToUser = () => {
      navigate(`/${reel?.postedBy.slug}`);
    };

    const handleFollow = async () => {
      const res = await follow({
        userId: user._id,
        targetId: reel?.postedBy._id,
      });
      if ("data" in res) {
        dispatch(followUserState(reel?.postedBy._id));
      }
    };
    const handleUnfollow = async () => {
      const res = await unfollow({
        userId: user._id,
        targetId: reel?.postedBy._id,
      });
      if ("data" in res) {
        dispatch(unfollowUserState(reel?.postedBy._id));
      }
    };

    const handleShowModalCardOptions = () => {
      dispatch(showModalCardOptions(reel));
    };

    const buttonCommentRef = useRef<HTMLDivElement>(null);
    const commentContainerRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(commentContainerRef, setShowComment, buttonCommentRef);

    return (
      <div
        key={reel?._id}
        className="relative snap-center flex-shrink-0 flex"
        style={{
          width: cardSize.w + "px",
          height: cardSize.h + "px",
          margin: `${cardSize.m}px 0`,
        }}
      >
        {/* video */}
        <div className="relative h-full flex-1 bg-black xs:rounded-lg overflow-hidden shadow-black/60 shadow-2xl">
          <video
            onClick={handlePlay}
            className="absolute w-full h-full object-cover cursor-pointer"
            autoPlay
            loop
            onPlay={() => setReelPlay(true)}
            onPause={() => setReelPlay(false)}
            muted={!reelMuted}
            ref={(el) => {
              if (ref && "current" in ref && ref.current && !ref.current[i]) {
                ref.current.push(el as HTMLVideoElement);
                handleLength();
              }
            }}
          >
            <source
              src={`${BASE_URL}/${reel?.content[0]}`}
              type="video/mp4"
            ></source>{" "}
          </video>
          {/* attributes */}
          {/* sound */}
          <button
            className="absolute top-4 right-4 p-2 bg-black/30 rounded-full text-white text-sm"
            onClick={handleSound}
          >
            {reelMuted && <HiSpeakerWave />}
            {!reelMuted && <HiSpeakerXMark />}
          </button>
          {/* play */}
          {!reelPlay && (
            <button
              onClick={handlePlay}
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-4 bg-black/30 rounded-full text-white text-4xl"
            >
              <BsFillPlayFill />
            </button>
          )}
          {/* description */}
          <div className="max-w-[90vw] xs:max-w-full absolute bottom-0 left-0 py-3 px-4 space-y-3 text-white">
            <div className="flex items-center gap-x-2">
              <div
                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                onClick={handleNavigateToUser}
              >
                <img
                  src={`${BASE_URL}/${reel?.postedBy?.profilePicture}`}
                  alt={reel?.postedBy?.username}
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold">
                  <span
                    className="cursor-pointer"
                    onClick={handleNavigateToUser}
                  >
                    {reel?.postedBy?.username}
                  </span>

                  {!isFollowed && !isOwnUser ? (
                    <span
                      className="text-xs font-medium  text-blue-500 cursor-pointer"
                      onClick={handleFollow}
                    >
                      {" "}
                      · Follow
                    </span>
                  ) : (
                    !isOwnUser && (
                      <span
                        className="text-xs  font-medium cursor-pointer"
                        onClick={handleUnfollow}
                      >
                        {" "}
                        · Following
                      </span>
                    )
                  )}
                </h4>
              </div>
            </div>
            <div className="text-[0.805rem] min-h-[2rem]">{reel?.caption}</div>
          </div>
        </div>
        {/* action */}
        <div className="absolute bottom-3 right-3 xs:relative xs:basis-[17%] flex flex-col gap-5 items-center justify-end pb-1 text-white xs:text-lightText xs:dark:text-darkText">
          <button
            onClick={handleLoves}
            className="flex flex-col gap-1 items-center font-semibold hover:opacity-60 text-3xl xs:text-3xl"
          >
            {liked && (
              <span className="text-red-500">
                <IoHeartSharp />
              </span>
            )}
            {!liked && (
              <span className="hover:opacity-75">
                <IoHeartOutline />
              </span>
            )}
            <span className="text-xs">{totalLikes}</span>
          </button>
          {/* comment */}
          <div className="relative flex flex-col gap-1 items-center font-semibold">
            {showComment && reel && (
              <ReelCommentCard
                reel={reel}
                comments={arrayCommentsTemp}
                addComment={(newComment: CommentType) =>
                  setArrayCommentsTemp((prev) => [newComment, ...prev])
                }
                handleClose={() => setShowComment(false)}
                ref={commentContainerRef}
              />
            )}
            <span
              ref={buttonCommentRef}
              onClick={() => setShowComment((prev) => !prev)}
              className="text-[1.45rem] xs:text-2xl hover:opacity-60 cursor-pointer"
            >
              <BsChat />
            </span>
            <span className="text-xs hover:opacity-60">
              {arrayCommentsTemp.length}
            </span>
          </div>
          <button className="flex flex-col items-center text-[1.45rem] xs:text-2xl hover:opacity-60">
            <IoPaperPlaneOutline />
          </button>
          <button
            className="hidden xs:flex flex-col items-center text-[1.45rem] xs:text-2xl hover:opacity-60"
            onClick={handleSave}
          >
            {saved && <IoBookmark className="text-black dark:text-white" />}
            {!saved && <IoBookmarkOutline className="hover:opacity-75" />}
          </button>
          <button
            onClick={handleShowModalCardOptions}
            className="flex flex-col items-center text-base xs:text-lg hover:opacity-60"
          >
            <BsThreeDots />
          </button>
          <button className="bg-gray-500 rounded-lg w-8 h-8 "></button>
        </div>
      </div>
    );
  }
);

export default ReelCard;
