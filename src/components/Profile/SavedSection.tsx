import { BsBookmark, BsPlus } from "react-icons/bs";
import postImage from "../../dummyData/postImage.jpg";
import EmptySection from "./EmptySection";
import { useShownUser } from "../../pages/Profile";
import {
  useGetSavedPostQuery,
  useGetThumbnailSavedQuery,
} from "../../app/features/post/postApiSlice";
import { BASE_URL } from "../../constants";
import { Link } from "react-router-dom";

const SavedSection = () => {
  const { user } = useShownUser();
  // const savedPostPage = useSelector(
  //   (state: RootState) => state.post.savedPostPage
  // );
  const { data, isLoading } = useGetThumbnailSavedQuery();

  const saved = data?.posts;

  const content = () => {
    if (saved && saved.length < 1)
      return (
        <EmptySection
          logo={<BsBookmark />}
          title="Save"
          desc="Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved."
        />
      );

    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-4 py-4 px-0">
        <div className="relative bg-semigrayIg/20 border border-white/20 w-[calc((100%-32px)/3)] h-0 pb-[calc((100%-32px)/3)] group cursor-pointer rounded-lg overflow-hidden">
          {/* title */}
          <div className="z-20 absolute bottom-3 left-5 text-xl text-darkText">
            <span>All Posts</span>
          </div>
          {/* overlay */}
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-600/50 flex justify-center items-center group-hover:hidden flex-col md:flex-row gap-x-8 gap-y-1 text-white font-bold"></div>

          <Link
            to="all-posts"
            className="absolute w-full h-full grid grid-cols-2 grid-rows-2"
          >
            {saved?.map((post, idx) => (
              <img
                key={idx}
                src={`${BASE_URL}/thumbnail/${post.thumbnail}`}
                alt="postImage"
                className="w-full h-full object-cover"
              />
            ))}
          </Link>
        </div>
        {/* <div className="relative bg-gray-300 w-[calc((100%-32px)/3)] h-0 pb-[calc((100%-32px)/3)] group cursor-pointer rounded-lg overflow-hidden">
          <div className="z-20 absolute bottom-3 left-5 text-xl text-darkText">
            <span>All Posts</span>
          </div>
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-600/60 flex justify-center items-center group-hover:hidden flex-col md:flex-row gap-x-8 gap-y-1 text-white font-bold"></div>
          <img
            src={postImage}
            alt="postImage"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div> */}
      </div>
    );
  };

  return (
    <main className="w-full">
      <div className="w-full flex items-center justify-between text-sm">
        <p>Only you can see what you saved</p>
        <button className="flex gap-1 items-center text-blue-500 font-semibold hover:text-lightText dark:hover:text-white">
          <span>
            <BsPlus />
          </span>
          <span>New collection</span>
        </button>
      </div>
      {content()}
    </main>
  );
};

export default SavedSection;
