import { BsXLg } from "react-icons/bs";
import { PostType, UserShortType, UserType } from "../../../types";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/features/auth/authSlice";
import { FormEvent, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useAddCommentMutation } from "../../app/features/post/postApiSlice";
import { VscSmiley } from "react-icons/vsc";
import { forwardRef } from "react";

type PropTypes = {
  reel: PostType;
  comments: {
    _id: string;
    user: UserShortType;
    comment: string;
  }[];
  addComment: (newComment: {
    _id: string;
    user: UserShortType;
    comment: string;
  }) => void;
  handleClose: () => void;
};

const ReelCommentCard = forwardRef<HTMLDivElement, PropTypes>(
  ({ reel, comments, addComment: addCommentState, handleClose }, ref) => {
    const user = useSelector(selectCurrentUser) as UserType;
    const [comment, setComment] = useState("");
    const [showEmojiBox, setShowEmojiBox] = useState(false);
    const [addComment] = useAddCommentMutation();
    const emojiBoxRef = useRef(null);

    const arrayComments = comments;

    const addEmoji = (emojiData: any) => {
      const emoji = String.fromCodePoint(
        ...emojiData.unified.split("-").map((hex: any) => parseInt(hex, 16))
      );
      setComment((prevComment) => prevComment + emoji);
    };

    const handleSubmitComment = async (e: FormEvent) => {
      e.preventDefault();

      const resComment = await addComment({
        comment,
        postId: reel?._id ?? "",
      });

      if ("data" in resComment) {
        setComment("");
        addCommentState(resComment.data.data);
      }
    };

    return (
      <div
        ref={ref}
        className="absolute right-10 xl:-right-[23rem] bottom-0 w-[22rem] shadow-black/10 shadow-xl rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText"
      >
        <header className="flex items-center justify-between py-0 px-6 pt-6">
          <span className="text-xl cursor-pointer" onClick={handleClose}>
            <BsXLg />
          </span>
          <h2 className="font-bold">Comments</h2>
          <span></span>
        </header>
        <div className="space-y-4 mt-6 min-h-[5rem] max-h-[10rem] overflow-y-auto px-6">
          {arrayComments.length < 1 && (
            <span className="opacity-50">There is no comment.</span>
          )}
          {arrayComments.map((comment) => (
            <div className="flex gap-x-2" key={comment._id}>
              <Link to={`/${comment?.user?.slug}`}>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={`${BASE_URL}/${comment?.user?.profilePicture}`}
                    alt={comment?.user?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="text-start">
                <p>
                  <Link to={`/${comment?.user?.slug}`}>
                    <span className="font-bold text-sm">
                      {comment?.user?.username}
                    </span>{" "}
                  </Link>
                  <span>{}</span>
                </p>
                <p className="text-sm">{comment?.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 px-6">
          <form
            onSubmit={handleSubmitComment}
            className="relative w-full flex gap-x-2 border p-1 rounded-full"
          >
            <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden">
              <img
                src={`${BASE_URL}/${user.profilePicture}`}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <input
              className="w-full bg-transparent outline-none text-sm font-medium"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
            {showEmojiBox && (
              <div className="absolute top-8 right-0" ref={emojiBoxRef}>
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
              <VscSmiley className="text-2xl hover:opacity-75 mr-1" />
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default ReelCommentCard;
