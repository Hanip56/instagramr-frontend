import postImage from "../dummyData/postImage.jpg";
import { BsFillChatFill, BsHeartFill } from "react-icons/bs";

const PostMiniCard = () => {
  return (
    <div className="relative bg-gray-300 w-full h-0 pb-[100%] group cursor-pointer">
      {/* overlay */}
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-darkBg/25 hidden justify-center items-center group-hover:flex flex-col md:flex-row gap-x-8 gap-y-1 text-white font-bold">
        <div className="flex items-center gap-2">
          <span>
            <BsHeartFill />
          </span>
          <span>40k</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <BsFillChatFill />
          </span>
          <span>30</span>
        </div>
      </div>
      <img
        src={postImage}
        alt="postImage"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default PostMiniCard;
