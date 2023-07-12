import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { selectCurrentUser } from "../../app/features/auth/authSlice";
import { UserType } from "../../../types";
import { useGetFollowingPostQuery } from "../../app/features/post/postApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../app/features/auth/authApiSlice";
import { logout as logoutState } from "../../app/features/auth/authSlice";
import apiSlice from "../../app/api/api";
import { nextPageFollowingPost } from "../../app/features/post/postSlice";
import { Card, SkeletonPost, StatusUser } from "..";
import { BASE_URL } from "../../constants";

const HomeMain = () => {
  const { followingPostPage } = useSelector((state: RootState) => state.post);
  const user = useSelector(selectCurrentUser) as UserType;
  const { data, isError, isLoading, isFetching } =
    useGetFollowingPostQuery(followingPostPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const FollowingPost = data?.posts;
  const status = [];

  const handleLogout = async () => {
    await logout();

    // reset cached data
    dispatch(logoutState());
    dispatch(apiSlice.util.resetApiState());
    dispatch(
      apiSlice.util.invalidateTags([
        "ExplorePost",
        "FollowingPost",
        "SinglePost",
      ])
    );
    navigate("/login");
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition + windowHeight === documentHeight) {
      // Reached the end of the window scrollbar
      if (data?.maxPages && followingPostPage < data?.maxPages && !isFetching) {
        dispatch(nextPageFollowingPost());
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [followingPostPage, data?.maxPages]);

  return (
    <div
      className={`${
        status.length > 0 ? "max-w-[1013px]" : "max-w-[821px]"
      } mx-auto flex justify-center h-screen pt-20 md:pt-10`}
    >
      <div
        className={`w-[100vw] xs:w-[calc(100vw-1.1rem)] h-full flex-shrink ${
          status.length > 0
            ? "lg:pr-16 md:max-w-[630px] lg:max-w-[694px]"
            : "lg:pr-8 md:max-w-[490px] lg:max-w-[522px]"
        }`}
      >
        {status.length > 0 && <StatusUser />}
        <div className="w-full flex justify-center">
          <div className="basis-[470px] flex flex-col items-center gap-y-4 pb-4">
            {isLoading &&
              Array(3)
                .fill("")
                .map((_, idx) => <SkeletonPost key={idx} />)}
            {!isLoading &&
              FollowingPost?.map((post) => <Card key={post._id} post={post} />)}
          </div>
          {/* {!isLoading &&
            !isError &&
            (postsFollowing?.ids ?? []).length < 1 && (
              <h1>There's no post, Let's Follow someone!!</h1>
            )} */}
          {/* {!isLoading && !isError && (
            <>
              {(postsFollowing?.ids ?? []).map((postId) => (
                <Card
                  post={postsFollowing!.entities[postId] as PostType}
                  key={postId}
                />
              ))}
              {reGetIsLoading && <Spinner />}
            </>
          )} */}
        </div>
        {/* loading fetching */}
        {isFetching && (
          <div className="w-8 h-8 border-2 border-t-transparent animate-spin rounded-full mx-auto my-8" />
        )}
      </div>

      <aside className="hidden xl:block w-[319px] h-80 mt-2">
        {/* account */}
        <div className="flex w-full h-20 gap-x-2 items-center justify-between">
          <Link to={`/${user.slug}`}>
            <div className="w-fit flex-shrink-0 flex gap-3 items-center gap-y-1">
              <div className="w-16 h-16 border-2 border-white rounded-full flex justify-center items-center">
                <div className="w-[91%] h-[91%] rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src={`${BASE_URL}/${user.profilePicture}`}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold">{user.username}</p>
                <p className="text-xs tracking-widest text-gray-400">
                  {user.fullname}
                </p>
              </div>
            </div>
          </Link>
          <button onClick={handleLogout} className="textButton">
            Logout
          </button>
        </div>
        {/* end account */}

        {/* suggestion */}
        <div className="h-72">
          <h4 className="font-semibold text-sm text-gray-500 dark:text-white/50">
            Suggested for you
          </h4>
          <div>{/* here suggestion other account */}</div>
        </div>

        {/* footer */}
        <div className="text-gray-400 dark:text-white/40 ">
          <div className="text-xs font-light leading-6">
            <Link to="#">About</Link> -<Link to="#">Help</Link> -
            <Link to="#">Press</Link> -<Link to="#">API</Link> -
            <Link to="#">Jobs</Link> -<Link to="#">Privacy</Link> -
            <Link to="#">Terms</Link> -<Link to="#">Locations</Link> -
            <Link to="#">Language</Link>
          </div>
          <h4 className="text-xs font-light mt-3">
            © {new Date().getFullYear()} INSTAGRAMR
          </h4>
        </div>
      </aside>
    </div>
  );
};

export default HomeMain;
