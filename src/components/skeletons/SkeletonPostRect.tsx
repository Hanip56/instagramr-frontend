const SkeletonPostRect = () => {
  return (
    <div className="relative bg-grayIg/30 dark:bg-grayIg w-full h-0 pb-[100%] group cursor-pointer animate-pulse">
      {/* overlay */}
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-darkBg/25 hidden justify-center items-center group-hover:flex flex-col md:flex-row gap-x-8 gap-y-1"></div>
    </div>
  );
};

export default SkeletonPostRect;
