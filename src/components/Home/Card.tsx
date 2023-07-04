import { FormEvent, useEffect, useRef, useState } from "react";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import { VscSmiley } from "react-icons/vsc";
import { get_time_diff } from "../../utils/getTimeDiff";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { useDispatch, useSelector } from "react-redux";
import {
  showModalCardOptions,
  showModalPost,
} from "../../app/features/modal/modalSlice";
import { PostType, UserType } from "../../../types";
import { BASE_URL } from "../../constants";
import { selectCurrentUser } from "../../app/features/auth/authSlice";
import {
  useAddCommentMutation,
  useLikeAndUnlikeMutation,
  useSaveAndUnsaveMutation,
} from "../../app/features/post/postApiSlice";
import { SkeletonPostRect } from "..";
import { handleMute } from "../../app/features/post/postSlice";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";

type PropTypes = {
  post: PostType;
};

const Card = ({ post }: PropTypes) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoPlay, setIsVideoPlay] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [commentsTemp, setCommentsTemp] = useState([...post.comments]);
  const [comment, setComment] = useState("");
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const user = useSelector(selectCurrentUser) as UserType;
  const emojiBoxRef = useRef(null);
  const dispatch = useDispatch();

  const [likeAndUnlike] = useLikeAndUnlikeMutation();
  const [saveAndUnsave] = useSaveAndUnsaveMutation();
  const [addComment] = useAddCommentMutation();
  const contentRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);

  const { muted } = useSelector((state: RootState) => state.post);
  const { modalPost } = useSelector((state: RootState) => state.modal);
  const liked = post?.likes.some((u) => u._id === user._id);
  const saved = post?.savedBy.some((u) => u === user._id);

  const isCommented = commentsTemp.filter((u) => u.user._id === user._id);
  const latestComment = isCommented.slice(-2);

  const handleLoves = async () => {
    console.log("handleLoves");
    await likeAndUnlike({
      postId: post?._id ?? "",
      user: {
        _id: user?._id,
        username: user?.username,
        profilePicture: user?.profilePicture,
        slug: user?.slug,
      },
    });
  };
  const handleSave = async () => {
    await saveAndUnsave({
      postId: post?._id ?? "",
      userId: user?._id,
    });
  };

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();

    const resComment = await addComment({
      comment,
      postId: post?._id ?? "",
    });

    if ("data" in resComment) {
      setComment("");
      setCommentsTemp((prev) => [...prev, resComment.data.data]);
    }
  };

  const handleShowModal = () => {
    dispatch(showModalPost({ postId: post._id }));
  };

  const handleShowModalCardOptions = () => {
    dispatch(showModalCardOptions(post));
  };

  const postDate = new Date(post?.createdAt);

  const currentPostDate = get_time_diff(postDate);

  const addEmoji = (emojiData: any) => {
    const emoji = String.fromCodePoint(
      ...emojiData.unified.split("-").map((hex: any) => parseInt(hex, 16))
    );
    setComment((prevComment) => prevComment + emoji);
  };

  useOutsideAlerter(emojiBoxRef, setShowEmojiBox);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (vidRef.current) {
      if (isVisible && !modalPost) {
        vidRef.current.play();
      } else {
        vidRef.current.pause();
      }
    }
  }, [isVisible, modalPost]);

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

  return (
    <div className="w-[100%]  mx-auto rounded-md bg-lightBg dark:bg-darkBg">
      <header className="w-full h-14 flex justify-between items-center px-2">
        <Link
          to={`/${post?.postedBy.slug}`}
          className="flex items-center gap-x-3"
        >
          <div
            className={`w-10 h-10 rounded-full border border-white flex justify-center items-center`}
          >
            <div className="w-[90%] h-[90%] rounded-full overflow-hidden">
              <img
                src={`${BASE_URL}/${post?.postedBy.profilePicture}`}
                alt={post?.postedBy.username}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div>
            <h4 className="font-semibold">{post?.postedBy.username}</h4>
            {/* <p className="text-gray-500 text-sm">{user?.fullname}</p> */}
          </div>
        </Link>
        <div
          className="flex justify-center items-center mr-2 cursor-pointer hover:opacity-50"
          onClick={handleShowModalCardOptions}
        >
          <BsThreeDots />
        </div>
      </header>
      <main>
        {!contentLoaded && post.contentType === "image" && (
          <div className="w-full h-[calc(30rem-58px)]">
            <SkeletonPostRect />
          </div>
        )}
        <div className="w-full max-h-[35rem] overflow-hidden">
          {post.contentType === "image" && (
            <img
              src={`${BASE_URL}/${post?.content[0]}`}
              alt="post img"
              className="object-contain w-full h-full object-center"
              onLoad={() => setContentLoaded(true)}
            />
          )}
          {post.contentType === "video" && (
            <div
              className="relative w-full h-[35rem] bg-black cursor-pointer"
              ref={contentRef}
            >
              {!isVideoPlay && (
                <button className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-8xl text-lightBg">
                  <BsPlayFill />
                </button>
              )}
              <video
                src={`${BASE_URL}/${post?.content[0]}`}
                muted
                className="w-full h-full object-contain object-center"
                loop
                ref={vidRef}
                onClick={handlePlay}
                onPlay={() => setIsVideoPlay(true)}
                onPause={() => setIsVideoPlay(false)}
                onLoad={() => setContentLoaded(true)}
              />
              <button
                className="absolute bottom-4 right-4 p-2 bg-black/30 rounded-full text-white text-sm"
                onClick={handleSound}
              >
                {muted && <HiSpeakerWave />}
                {!muted && <HiSpeakerXMark />}
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-2xl">
          <div className="flex items-center gap-x-4 py-3 px-2 sm:px-0">
            <button onClick={handleLoves}>
              {liked && <IoHeartSharp className="text-red-500" />}
              {!liked && <IoHeartOutline className="hover:opacity-75" />}
            </button>
            <button className="hover:opacity-75" onClick={handleShowModal}>
              <IoChatbubbleOutline />
            </button>
            <button className="hover:opacity-75">
              <IoPaperPlaneOutline />
            </button>
          </div>
          <div>
            <button
              className="hover:opacity-75 mr-1 sm:mr-0"
              onClick={handleSave}
            >
              {saved && <IoBookmark className="text-black dark:text-white" />}
              {!saved && <IoBookmarkOutline className="hover:opacity-75" />}
            </button>
          </div>
        </div>
        <div className="pb-2 leading-7 text-sm px-2 sm:px-0">
          <p className="font-semibold">{post?.likes?.length} Likes</p>
          <p>
            <span className="font-semibold">{post?.postedBy?.username}</span>{" "}
            <span className="font-light">{post?.caption}</span>
          </p>
          {commentsTemp?.length > 0 && (
            <p
              className="text-xs my-1 text-gray-400 cursor-pointer"
              onClick={handleShowModal}
            >
              View all comments
            </p>
          )}
          {latestComment?.length > 0 &&
            latestComment.map((comment, idx) => (
              <p key={idx}>
                <span className="font-bold">{comment?.user?.username} </span>
                {comment?.comment}
              </p>
            ))}
          <p
            className="text-gray-400 font-light text-xs"
            onClick={handleShowModal}
          >
            {currentPostDate}
          </p>
        </div>
      </main>
      <footer className="flex justify-between py-2 px-2 sm:px-0 text-xs text-lightText dark:text-darkText">
        <form
          onSubmit={handleSubmitComment}
          className="relative w-full flex gap-x-2"
        >
          {showEmojiBox && (
            <div className="absolute bottom-8 right-0" ref={emojiBoxRef}>
              <Picker
                data={data}
                onEmojiSelect={addEmoji}
                theme={"light"}
                emojiButtonSize={30}
                emojiSize={16}
              />
            </div>
          )}
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {comment.length > 0 && (
            <button
              type="submit"
              className={`${
                comment ? "text-blue-400" : "text-blue-300/80"
              } font-semibold text-xs`}
              disabled={!comment}
            >
              Post
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowEmojiBox((prev) => !prev)}
          >
            <VscSmiley className="text-lg text-black/50 hover:text-black/40 dark:text-white/50 dark:hover:text-white/40" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Card;
