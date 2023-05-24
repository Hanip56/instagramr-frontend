import { BsPlus } from "react-icons/bs";
import postImage from "../../dummyData/postImage.jpg";

const SavedSection = () => {
  return (
    <main className="w-full">
      <div className="w-full flex items-center justify-between">
        <p>Only you can see what you saved</p>
        <button className="flex gap-1 items-center text-blue-500 font-semibold hover:text-lightText dark:hover:text-white">
          <span>
            <BsPlus />
          </span>
          <span>New collection</span>
        </button>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 py-4 px-0">
        {Array(6)
          .fill("")
          .map((key, idx) => (
            <div className="relative bg-gray-300 w-[calc((100%-32px)/3)] h-0 pb-[calc((100%-32px)/3)] group cursor-pointer rounded-lg overflow-hidden">
              {/* title */}
              <div className="z-20 absolute bottom-3 left-5 text-xl text-darkText">
                <span>Title Collection</span>
              </div>
              {/* overlay */}
              <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-600/60 flex justify-center items-center group-hover:hidden flex-col md:flex-row gap-x-8 gap-y-1 text-white font-bold"></div>
              <img
                src={postImage}
                alt="postImage"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          ))}
      </div>
    </main>
  );
};

export default SavedSection;
