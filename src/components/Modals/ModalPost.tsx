import { useRef, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModalPost,
  showModalOwnCardOptions,
} from "../../app/features/modal/modalSlice";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { get_time_diff } from "../../utils/getTimeDiff";
import { BASE_URL } from "../../constants";

import { SkeletonModalPost } from "..";
import { RootState } from "../../app/store";
import { UserType } from "../../../types";
import {
  followUserState,
  selectCurrentUser,
  unfollowUserState,
} from "../../app/features/auth/authSlice";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/features/user/userApiSlice";
import {
  useAddCommentMutation,
  useGetSinglePostQuery,
  useLikeAndUnlikeMutation,
  useSaveAndUnsaveMutation,
} from "../../app/features/post/postApiSlice";
import { handleMute } from "../../app/features/post/postSlice";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const ModalPost = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser) as UserType;
  const { postId } = useSelector(
    (state: RootState) => state.modal.modalPayload
  );
  const { data: currentPost, isLoading } = useGetSinglePostQuery(postId);

  const [isVideoPlay, setIsVideoPlay] = useState(false);
  const [comment, setComment] = useState("");
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const emojiBoxRef = useRef(null);
  const commentRef = useRef<HTMLInputElement>(null);

  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();
  const [likeAndUnlike] = useLikeAndUnlikeMutation();
  const [saveAndUnsave] = useSaveAndUnsaveMutation();
  const [addComment] = useAddCommentMutation();

  const { muted } = useSelector((state: RootState) => state.post);
  const liked = currentPost?.likes.some((u) => u._id === user._id);
  const totalLikes = currentPost?.likes.length;
  const saved = currentPost?.savedBy.some((u) => u === user._id);

  const handleHideModal = () => {
    dispatch(hideModalPost());
  };

  const handleSave = async () => {
    await saveAndUnsave({
      postId: currentPost?._id ?? "",
      userId: user?._id,
    });
  };

  const handleLoves = async () => {
    await likeAndUnlike({
      postId: currentPost?._id ?? "",
      user: {
        _id: user?._id,
        username: user?.username,
        profilePicture: user?.profilePicture,
        slug: user?.slug,
      },
    });
  };

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();

    const resComment = await addComment({
      comment,
      postId: currentPost?._id ?? "",
    });

    if ("data" in resComment) {
      setComment("");
    }
  };

  const isOwnUser = currentPost?.postedBy._id === user._id;

  const isFollowed = user.followings.includes(currentPost?.postedBy._id ?? "");

  const handleFollow = async () => {
    const res = await follow({
      userId: user._id,
      targetId: currentPost?.postedBy._id,
    });
    if ("data" in res) {
      dispatch(followUserState(currentPost?.postedBy._id));
    }
  };
  const handleUnfollow = async () => {
    const res = await unfollow({
      userId: user._id,
      targetId: currentPost?.postedBy._id,
    });
    if ("data" in res) {
      dispatch(unfollowUserState(currentPost?.postedBy._id));
    }
  };

  const handleNavigateToUser = () => {
    console.log("handleNavigateToUser");
  };

  const handleShowModalOptions = () => {
    dispatch(showModalOwnCardOptions({ post: currentPost }));
  };

  const vidRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsVideoPlay((prev) => {
      if (prev) {
        vidRef.current?.pause();
        return false;
      } else {
        vidRef.current?.play();
        return true;
      }
    });
  };

  const handleSound = () => {
    dispatch(handleMute());
  };

  const addEmoji = (emojiData: any) => {
    const emoji = String.fromCodePoint(
      ...emojiData.unified.split("-").map((hex: any) => parseInt(hex, 16))
    );
    setComment((prevComment) => prevComment + emoji);
  };

  const postDate = new Date(currentPost?.createdAt ?? "");

  const currentPostDate = get_time_diff(postDate);

  useOutsideAlerter(emojiBoxRef, setShowEmojiBox);

  const headerEl = (
    <header className="flex py-2 px-4 gap-x-2 border border-transparent border-b-gray-200 dark:border-b-gray-200/20">
      <div
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        onClick={handleNavigateToUser}
      >
        <img
          src={`${BASE_URL}/${currentPost?.postedBy?.profilePicture}`}
          alt={currentPost?.postedBy?.username}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-semibold">
          <span className="cursor-pointer" onClick={handleNavigateToUser}>
            {currentPost?.postedBy?.username}
          </span>

          {!isFollowed && !isOwnUser ? (
            <span
              className="text-xs text-blue-500 cursor-pointer"
              onClick={handleFollow}
            >
              {" "}
              . Follow
            </span>
          ) : (
            !isOwnUser && (
              <span className="text-xs cursor-pointer" onClick={handleUnfollow}>
                {" "}
                . Following
              </span>
            )
          )}
        </h4>
      </div>
      {isOwnUser && (
        <div
          className="w-6 h-6 flex justify-center items-center ml-auto cursor-pointer"
          onClick={handleShowModalOptions}
        >
          <BsThreeDots />
        </div>
      )}
    </header>
  );

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-md text-lightText dark:text-darkText">
        <div className="animate-fadeIn">
          {isLoading && <SkeletonModalPost />}
          {!isLoading && (
            <div className="flex flex-col sm:flex-row w-[80vw] lg:w-[80vw] bg-white dark:bg-darkBg  h-[80vh] sm:h-[90vh] rounded-md overflow-hidden justify-between">
              <div className="block sm:hidden">{headerEl}</div>

              <div className="basis-[70%] sm:basis-[65%] bg-black overflow-hidden">
                <div className="relative w-full h-full">
                  {currentPost?.contentType === "image" && (
                    <img
                      src={`${BASE_URL}/${currentPost?.content[0]}`}
                      alt={currentPost?.caption}
                      className="w-full h-full object-contain object-center"
                    />
                  )}
                  {currentPost?.contentType === "video" && (
                    <div className="relative w-full h-full bg-black cursor-pointer">
                      {!isVideoPlay && (
                        <button className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-8xl text-lightBg">
                          <BsPlayFill />
                        </button>
                      )}
                      <video
                        autoPlay
                        muted={muted}
                        loop
                        src={`${BASE_URL}/${currentPost?.content[0]}`}
                        className="w-full h-full object-contain object-center"
                        onClick={handlePlay}
                        ref={vidRef}
                        onPlay={() => setIsVideoPlay(true)}
                        onPause={() => setIsVideoPlay(false)}
                        // onLoad={() => setContentLoaded(true)}
                      />
                      <button
                        className="absolute bottom-4 right-4 p-3 bg-black/30 rounded-full text-white text-base"
                        onClick={handleSound}
                      >
                        {!muted && <HiSpeakerWave />}
                        {muted && <HiSpeakerXMark />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 flex flex-col pb-2">
                <div className="hidden sm:block">{headerEl}</div>
                <main className="hidden sm:block p-2 px-4 basis-[80%] border border-transparent border-b-gray-200 dark:border-b-gray-200/20 ">
                  <div className="flex gap-x-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={`${BASE_URL}/${currentPost?.postedBy?.profilePicture}`}
                        alt={currentPost?.postedBy?.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">
                          {currentPost?.postedBy?.username}
                        </span>{" "}
                        {currentPost?.caption}
                      </p>
                    </div>
                  </div>
                  {/* comments here */}
                  <div className="space-y-4 mt-6 max-h-[26rem] overflow-y-auto">
                    {currentPost?.comments?.map((comment: any) => (
                      <div className="flex gap-x-4" key={comment._id}>
                        <Link to={`/${comment?.user?.slug}`}>
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={`${BASE_URL}/${currentPost?.postedBy?.profilePicture}`}
                              alt={comment?.user?.username}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        <div>
                          <p>
                            <Link to={`/${comment?.user?.slug}`}>
                              <span className="font-semibold">
                                {comment?.user?.username}
                              </span>{" "}
                            </Link>

                            {comment?.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>
                <footer className="basis-[20%] flex flex-col justify-between gap-y-3">
                  <div className="px-3">
                    <div className="flex items-center gap-x-4 text-2xl mt-3 mb-2">
                      <button onClick={handleLoves}>
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
                      </button>
                      <button
                        onClick={() => commentRef.current?.focus()}
                        className="hover:opacity-75"
                      >
                        <IoChatbubbleOutline />
                      </button>
                      <Link to={"/direct"} className="hover:opacity-75">
                        <IoPaperPlaneOutline />
                      </Link>
                      <button
                        className="hover:opacity-75 ml-auto"
                        onClick={handleSave}
                      >
                        {saved && (
                          <IoBookmark className="text-black dark:text-white" />
                        )}
                        {!saved && (
                          <IoBookmarkOutline className="hover:opacity-75" />
                        )}
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold">
                        {totalLikes}
                        <span> Likes</span>
                      </p>
                    </div>
                    <div>
                      <p className="font-light text-gray-500 text-xs">
                        {currentPostDate}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block border border-transparent border-t-gray-200 dark:border-t-gray-200/20  p-3">
                    <form
                      onSubmit={handleSubmitComment}
                      className="relative w-full flex gap-x-2"
                    >
                      {showEmojiBox && (
                        <div
                          className="absolute bottom-8 -left-32"
                          ref={emojiBoxRef}
                        >
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
                        onClick={() => setShowEmojiBox((prev) => !prev)}
                      >
                        <VscSmiley className="text-2xl hover:opacity-75" />
                      </button>
                      <input
                        className="w-full bg-transparent outline-none"
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentRef}
                      />
                      <button
                        type="submit"
                        className={`${
                          comment ? "text-blue-400" : "text-blue-300/80"
                        } font-semibold text-sm`}
                        disabled={!comment}
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </footer>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalPost;
