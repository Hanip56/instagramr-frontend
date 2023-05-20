import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const SearchNavbar = () => {
  return (
    <div className="w-[397px] h-full hidden md:flex flex-col fixed top-0 bottom-0 left-[4.75rem] text-lightText dark:text-darkText bg-lightBg dark:bg-darkBg z-20 animate-fadeIn">
      <h1 className="font-semibold text-2xl mb-10 m-6">Search</h1>
      {/* search input */}
      <div className="rounded-lg overflow-hidden bg-grayIg/5 dark:bg-grayIg px-4 py-[10px] flex m-6 flex-shrink-0">
        <input
          placeholder="Search"
          className="bg-transparent flex-1 text-sm outline-none"
        />
        <button className="text-gray-300">
          <AiFillCloseCircle />
        </button>
      </div>
      <div className="overflow-y-scroll flex flex-col gap-3 p-6 flex-1 border border-transparent border-t-grayIg/10 dark:border-t-gray-200/20">
        {Array(24)
          .fill("")
          .map((key, idx) => (
            <Link to={`/halfz`} key={idx}>
              <div className="w-fit flex-shrink-0 flex gap-4 items-center gap-y-1">
                <div className="w-16 h-16 border-2 border-white rounded-full flex justify-center items-center">
                  <div className="w-[91%] h-[91%] rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <p className="text-sm font-bold">Halfz</p>
                  <p className="text-xs tracking-widest text-gray-400">HAH</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchNavbar;
