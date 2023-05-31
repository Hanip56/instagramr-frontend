const SkeletonPost = () => {
  return (
    <div className="flex flex-col h-[30rem] w-full mx-auto rounded-md overflow-hidden bg-darkBg">
      <div className="flex items-center gap-2 p-2">
        <div className="w-[40px] h-[38px] rounded-full bg-gray-300 animate-pulse" />
        <div className="flex flex-col gap-1 w-full">
          <div className="w-[30%] h-3 bg-gray-300 animate-pulse rounded-sm" />
          <div className="w-[20%] h-2 bg-gray-300 animate-pulse rounded-sm" />
        </div>
      </div>
      <div className="w-full h-full animate-pulse bg-gray-600" />
    </div>
  );
};

export default SkeletonPost;
