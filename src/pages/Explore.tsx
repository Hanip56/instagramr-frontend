import { Footer } from "../components";
import postImage from "../dummyData/postImage.jpg";

const Explore = () => {
  return (
    <div>
      <main className="max-w-[935px] mx-auto grid grid-cols-3 gap-1 py-6 px-0 md:px-2">
        {Array(8)
          .fill("")
          .map((key, idx) => (
            <div key={idx} className="bg-gray-300 w-full h-full">
              <img src={postImage} alt="postImage" />
            </div>
          ))}
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
