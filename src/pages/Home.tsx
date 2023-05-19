import { Link } from "react-router-dom";
import { Card, SkeletonPost, StatusUser } from "../components";
import { postData } from "../dummyData";

const Home = () => {
  const isLoadingPF = false;
  const isError = false;
  const postsFollowing = false;

  return (
    <div className="max-w-[1013px] mx-auto flex justify-center h-screen pt-10">
      <div className="w-[100vw] xs:w-[calc(100vw-1.1rem)] md:max-w-[630px] lg:max-w-[694px] lg:pr-16 h-full flex-shrink">
        <StatusUser />
        <div className="w-full flex justify-center">
          <div className="basis-[470px] flex flex-col items-center gap-y-4 pb-20">
            {isLoadingPF &&
              Array(3)
                .fill("")
                .map((key, idx) => <SkeletonPost key={idx} />)}
            {!isLoadingPF &&
              Array(3)
                .fill("")
                .map((key, idx) => <Card key={idx} />)}
          </div>
          {/* {!isLoadingPF &&
            !isError &&
            (postsFollowing?.ids ?? []).length < 1 && (
              <h1>There's no post, Let's Follow someone!!</h1>
            )} */}
          {/* {!isLoadingPF && !isError && (
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
      </div>

      <aside className="hidden xl:block w-[319px] h-80 mt-2">
        {/* account */}
        <div className="flex w-full h-20 gap-x-2 items-center justify-between">
          <Link to={`/halfz`}>
            <div className="w-fit flex-shrink-0 flex gap-4 items-center gap-y-1">
              <div className="w-16 h-16 border-2 border-white rounded-full flex justify-center items-center">
                <div className="w-[91%] h-[91%] rounded-full bg-gray-300"></div>
              </div>
              <div>
                <p className="text-sm font-bold">Halfz</p>
                <p className="text-xs tracking-widest text-gray-400">HAH</p>
              </div>
            </div>
          </Link>
          <button className="textButton">Switch</button>
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

export default Home;
