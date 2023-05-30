import React from "react";
import { PostMiniCard } from "..";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/features/auth/authSlice";
import EmptySection from "./EmptySection";
import { BsCamera } from "react-icons/bs";

const PostsSection = () => {
  const user = useSelector(selectCurrentUser);

  const posts = user?.posts;

  if (posts.length < 1)
    return (
      <EmptySection
        logo={<BsCamera />}
        title="Share Photos"
        desc="When you share photos, they will appear on you profile"
      />
    );

  return (
    <main className="w-full grid grid-cols-3 gap-1 py-6 px-0 md:px-2">
      {posts.length > 0 && posts.map((key, idx) => <PostMiniCard key={idx} />)}
    </main>
  );
};

export default PostsSection;
