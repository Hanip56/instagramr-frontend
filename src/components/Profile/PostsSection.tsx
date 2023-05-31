import React from "react";
import { PostMiniCard } from "..";
import EmptySection from "./EmptySection";
import { BsCamera } from "react-icons/bs";
import { useShownUser } from "../../pages/Profile";

const PostsSection = () => {
  const user = useShownUser();

  const posts = user?.posts;

  if (posts && posts.length < 1)
    return (
      <EmptySection
        logo={<BsCamera />}
        title="Share Photos"
        desc="When you share photos, they will appear on you profile"
      />
    );

  console.log({ posts });

  return (
    <main className="w-full grid grid-cols-3 gap-1 py-6 px-0 md:px-2">
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostMiniCard key={post._id} post={post} />)}
    </main>
  );
};

export default PostsSection;
