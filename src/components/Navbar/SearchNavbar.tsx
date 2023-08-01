import { useState, forwardRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useFindUserQuery } from "../../app/features/user/userApiSlice";
import { BASE_URL } from "../../constants";

type PropTypes = {
  handleCloseSearchBar: () => void;
};

const SearchNavbar = forwardRef<HTMLDivElement, PropTypes>(
  ({ handleCloseSearchBar }, ref) => {
    const [search, setSearch] = useState("");

    const { data: searchedUsers } = useFindUserQuery(search);

    return (
      <div
        ref={ref}
        className="w-[397px] h-full hidden md:flex flex-col fixed top-0 bottom-0 left-[4.3rem] lg:left-[4.75rem] text-lightText dark:text-darkText bg-lightBg dark:bg-darkBg z-20"
      >
        <h1 className="font-semibold text-2xl mb-10 m-6">Search</h1>
        {/* search input */}
        <div className="rounded-lg overflow-hidden bg-grayIg/5 dark:bg-grayIg px-4 py-[10px] flex m-6 flex-shrink-0">
          <input
            placeholder="Search"
            className="bg-transparent flex-1 text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-gray-300" onClick={() => setSearch("")}>
            <AiFillCloseCircle />
          </button>
        </div>
        <div className="overflow-y-scroll flex flex-col flex-1 border border-transparent border-t-grayIg/10 dark:border-t-gray-200/20 py-2">
          {(searchedUsers ?? []).length < 1 && (
            <span className="p-4 px-6 opacity-75">No Results Found</span>
          )}
          {searchedUsers?.map((user) => (
            <Link
              to={`/${user.slug}`}
              key={user._id}
              onClick={handleCloseSearchBar}
            >
              <div className="w-full flex-shrink-0 flex gap-4 px-6 py-2 items-center gap-y-1 hover:bg-white/[.08]">
                <div className="w-16 h-16 border-2 border-white rounded-full flex justify-center items-center">
                  <div className="w-[91%] h-[91%] rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={`${BASE_URL}/${user.profilePicture}`}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">{user.username}</p>
                  <p className="text-xs tracking-widest text-gray-400">
                    <span>{user?.fullname}</span>
                    <span>
                      {" "}
                      - {user.totalFollowers}{" "}
                      {user.totalFollowers > 1 ? "followers" : "follower"}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
);

export default SearchNavbar;
