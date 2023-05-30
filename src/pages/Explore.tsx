import { useGetExplorePostQuery } from "../app/features/post/postApiSlice";
import { Footer, PostMiniCard } from "../components";

const Explore = () => {
  const {
    data: explorePost,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetExplorePostQuery("1");

  const posts = explorePost?.posts;

  return (
    <div>
      <main className="max-w-[935px] mx-auto grid grid-cols-3 gap-1 py-6 px-0 md:px-2 ">
        {posts?.map((post) => (
          <PostMiniCard key={post._id} post={post} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
