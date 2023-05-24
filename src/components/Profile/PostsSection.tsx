import React from "react";
import { PostMiniCard } from "..";

const PostsSection = () => {
  return (
    <main className="w-full grid grid-cols-3 gap-1 py-6 px-0 md:px-2">
      {Array(8)
        .fill("")
        .map((key, idx) => (
          <PostMiniCard key={idx} />
        ))}
    </main>
  );
};

export default PostsSection;
