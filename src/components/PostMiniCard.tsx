import { useDispatch } from "react-redux";
import { PostType } from "../../types";
import { BASE_URL } from "../constants";
import { BsFillChatFill, BsHeartFill } from "react-icons/bs";
import { showModalPost } from "../app/features/modal/modalSlice";

type PropTypes = {
  post: PostType;
};

const PostMiniCard = ({ post }: PropTypes) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(showModalPost(post._id));
  };

  return (
    <div
      onClick={handleOpenModal}
      className="relative bg-grayIg w-full h-0 pb-[100%] group cursor-pointer"
    >
      {/* overlay */}
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-darkBg/25 hidden justify-center items-center group-hover:flex flex-col md:flex-row gap-x-8 gap-y-1 text-white font-bold">
        <div className="flex items-center gap-2">
          <span>
            <BsHeartFill />
          </span>
          <span>{post?.totalLikes}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <BsFillChatFill />
          </span>
          <span>{post?.totalComments}</span>
        </div>
      </div>
      <img
        src={`${BASE_URL}/${post?.content[0]}`}
        alt={`thumbnail`}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default PostMiniCard;
