import { StatusUser } from "../components";

const Home = () => {
  return (
    <div className="max-w-[1013px] mx-auto flex justify-center h-screen pt-10">
      <div className="basis-[694px] pr-16 h-full">
        <StatusUser />
        <div className="w-full h-[300px] py-4 bg-gray-700"></div>
      </div>
      <div className="hidden xl:block w-[319px] bg-gray-500 h-80"></div>
    </div>
  );
};

export default Home;
