const SkeletonModalPost = () => {
  return (
    <div className="flex flex-col md:flex-row  w-[80vw] lg:w-[80vw] bg-white dark:bg-grayIg h-[80vh] sm:h-[90vh] rounded-md overflow-hidden justify-between">
      <div className="basis-[75%] sm:basis-[65%] bg-gray-400 animate-pulse overflow-hidden" />
      <div className="flex-1 flex flex-col" />
    </div>
  );
};

export default SkeletonModalPost;
