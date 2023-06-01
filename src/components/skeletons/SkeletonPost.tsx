const SkeletonPost = () => {
  return (
    <div className="flex flex-col h-[30rem] w-full mx-auto rounded-md overflow-hidden bg-white dark:bg-darkBg border dark:border-transparent">
      <div className="flex items-center gap-2 p-2">
        <div className="w-[40px] h-[38px] rounded-full bg-grayIg/30 dark:bg-grayIg animate-pulse" />
        <div className="flex flex-col gap-1 w-full">
          <div className="w-[30%] h-3 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-md" />
          <div className="w-[20%] h-2 bg-grayIg/30 dark:bg-grayIg animate-pulse rounded-md" />
        </div>
      </div>
      <div className="w-full h-full animate-pulse bg-grayIg/30 dark:bg-grayIg" />
    </div>
  );
};

export default SkeletonPost;
