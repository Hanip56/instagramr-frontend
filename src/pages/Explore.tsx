import { Footer, PostMiniCard } from "../components";

const Explore = () => {
  return (
    <div>
      <main className="max-w-[935px] mx-auto grid grid-cols-3 gap-1 py-6 px-0 md:px-2 ">
        {Array(8)
          .fill("")
          .map((key, idx) => (
            <PostMiniCard key={idx} />
          ))}
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
