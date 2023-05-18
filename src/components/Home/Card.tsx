import { FormEvent, useRef, useState } from "react";
import {
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoBookmarkOutline,
  IoBookmarkSharp,
} from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { VscSmiley } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { get_time_diff } from "../../utils/getTimeDiff";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useOutsideAlerter from "../../utils/ClickOutside";
// import { BASE_URL } from "../../constants";
import { postData as post } from "../../dummyData";

const Card = () => {
  const [comment, setComment] = useState("");
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const emojiBoxRef = useRef(null);
  // const [saveOrUnsave] = useSaveOrUnsaveMutation();
  // const [addComment] = useAddCommentMutation();

  const liked = false;
  const saved = false;

  const isCommented = ["1"];

  const handleLoves = async () => {
    console.log("handleLoves");
  };
  const handleSave = async () => {
    console.log("handleSave");
  };

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
  };

  const handleShowModal = () => {
    console.log("handleShowModal");
  };

  const handleShowModalCardOptions = () => {
    console.log("handleShowModalCardOptions");
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

  return (
    <div className="w-[100%]  mx-auto rounded-md bg-darkBg">
      <header className="w-full h-14 flex justify-between items-center px-2">
        <div className="flex items-center gap-x-4">
          <div
            className={`w-10 h-10 rounded-full border border-white flex justify-center items-center`}
          >
            <div className="w-[90%] h-[90%] rounded-full overflow-hidden">
              <img
                src={post.image}
                alt={post?.postedBy.username}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div>
            <h4 className="font-semibold">{post?.postedBy.username}</h4>
            {/* <p className="text-gray-500 text-sm">{user?.fullname}</p> */}
          </div>
        </div>
        <div
          className="flex justify-center items-center mr-2 cursor-pointer"
          onClick={handleShowModalCardOptions}
        >
          <BsThreeDots />
        </div>
      </header>
      <main>
        <div className="w-full max-h-[30rem] overflow-hidden">
          <img
            src={post.image}
            alt="post img"
            className="object-contain w-full h-full object-center"
          />
        </div>
        <div className="flex items-center justify-between text-2xl">
          <div className="flex items-center gap-x-4 py-3">
            <button onClick={handleLoves}>
              {liked && <IoHeartSharp className="text-red-500" />}
              {!liked && <IoHeartOutline className="hover:text-black/40" />}
            </button>
            <button className="hover:text-black/40" onClick={handleShowModal}>
              <IoChatbubbleOutline />
            </button>
            <button className="hover:text-black/40">
              <IoPaperPlaneOutline />
            </button>
          </div>
          <div>
            <button className="hover:text-black/40" onClick={handleSave}>
              {saved && <IoBookmarkSharp className="text-black" />}
              {!saved && <IoBookmarkOutline className="hover:text-black/40" />}
            </button>
          </div>
        </div>
        <div className="pb-2 leading-7 text-sm">
          <p className="font-semibold">{post?.likes?.length} Likes</p>
          <p>
            <span className="font-semibold">{post?.postedBy?.username}</span>{" "}
            <span className="font-light">{post?.caption}</span>
          </p>
          {post?.comments?.length > 0 && (
            <p
              className="text-xs my-1 text-gray-400 cursor-pointer"
              onClick={handleShowModal}
            >
              View all comments
            </p>
          )}
          {/* {isCommented?.length > 0 &&
            isCommented.map((comment, idx) => (
              <p key={idx}>
                <span className="font-bold">{comment?.user?.username} </span>
                {comment?.comment}
              </p>
            ))} */}
          <p
            className="text-gray-400 font-light text-xs"
            onClick={handleShowModal}
          >
            {currentPostDate}
          </p>
        </div>
      </main>
      <footer className="flex justify-between py-2 text-xs">
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
            >
              Post
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowEmojiBox((prev) => !prev)}
          >
            <VscSmiley className="text-lg text-white/50 hover:text-white/40" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Card;
