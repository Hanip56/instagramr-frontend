import { useEffect } from "react";
import { useGetSavedPostQuery } from "../app/features/post/postApiSlice";
import { Footer, PostMiniCard, SkeletonPostRect } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { nextPageSavedPost } from "../app/features/post/postSlice";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const { savedPostPage } = useSelector((state: RootState) => state.post);
  const {
    data: savedPosts,
    isLoading,
    isFetching,
  } = useGetSavedPostQuery({ pageNumber: savedPostPage });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = savedPosts?.posts;

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition + windowHeight === documentHeight) {
      // Reached the end of the window scrollbar
      if (
        savedPosts?.maxPages &&
        savedPostPage < savedPosts?.maxPages &&
        !isFetching
      ) {
        dispatch(nextPageSavedPost());
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [savedPostPage, savedPosts?.maxPages]);

  //   useEffect(() => {
  //     return () => {};
  //   }, []);

  return (
    <div className="max-w-[935px] mx-auto py-6">
      <header>
        <button
          onClick={() => navigate(-1)}
          className="flex gap-2 items-center text-white/70 font-semibold mb-4"
        >
          <span>
            <BsChevronLeft />
          </span>
          <span className="text-sm">Saved</span>
        </button>
        <h1 className="indent-2 mb-1 text-xl">All posts</h1>
      </header>
      <main className="grid grid-cols-3 gap-1 px-0 md:px-2 ">
        {isLoading &&
          Array(9)
            .fill("")
            .map((_, i) => <SkeletonPostRect key={i} />)}
        {!isLoading &&
          posts?.map((post) => <PostMiniCard key={post._id} post={post} />)}
      </main>
      {isFetching && (
        <div className="w-8 h-8 border-2 border-t-transparent animate-spin rounded-full mx-auto my-8" />
      )}
      <Footer />
    </div>
  );
};

export default Saved;
