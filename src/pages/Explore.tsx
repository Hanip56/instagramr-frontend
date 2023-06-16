import { useEffect } from "react";
import { useGetExplorePostQuery } from "../app/features/post/postApiSlice";
import { Footer, PostMiniCard, SkeletonPostRect } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { nextPageExplorePost } from "../app/features/post/postSlice";

const Explore = () => {
  const { explorePostPage } = useSelector((state: RootState) => state.post);
  const {
    data: explorePost,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetExplorePostQuery(explorePostPage);
  const dispatch = useDispatch();

  const posts = explorePost?.posts;

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition + windowHeight === documentHeight) {
      // Reached the end of the window scrollbar
      if (
        explorePost?.maxPages &&
        explorePostPage < explorePost?.maxPages &&
        !isFetching
      ) {
        dispatch(nextPageExplorePost());
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [explorePostPage, explorePost?.maxPages]);

  return (
    <div>
      <main className="max-w-[935px] mx-auto grid grid-cols-3 gap-1 py-6 px-0 md:px-2 ">
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

export default Explore;
