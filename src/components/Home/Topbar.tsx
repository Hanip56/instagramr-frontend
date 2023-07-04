import React, { useState, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useFindUserQuery } from "../../app/features/user/userApiSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const Topbar = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const {
    data: searchedUsers,
    isLoading,
    isFetching,
    error,
  } = useFindUserQuery(search);

  const inputContainerRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(inputContainerRef, setIsFocused);

  return (
    <div className="flex md:hidden fixed z-10 bg-lightBg dark:bg-darkBg top-0 w-full h-[60px] justify-between items-center border border-transparent border-b-black/20 dark:border-b-white/20 px-4">
      <span>INSTAGRAMR</span>
      <div
        ref={inputContainerRef}
        className="relative rounded-lg bg-grayIg/5 dark:bg-grayIg flex px-4 py-2 gap-3 w-[30]"
      >
        <label htmlFor="searchMobileInput" className="text-gray-400 text-lg">
          <BiSearch />
        </label>
        <input
          id="searchMobileInput"
          placeholder="Search"
          className="bg-transparent flex-1 text-sm outline-none"
          value={search}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="text-gray-400" onClick={() => setSearch("")}>
          <AiFillCloseCircle />
        </button>
        {isFocused && (
          <div className="absolute z-50 top-10 right-0 w-80 h-80 bg-lightBg dark:bg-darkBg shadow-md rounded-lg">
            {!isLoading && (searchedUsers ?? []).length < 1 && (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-sm text-gray-400">No results found.</p>
              </div>
            )}
            {!isLoading &&
              searchedUsers?.map((user) => (
                <Link to={`/${user.slug}`} key={user._id}>
                  <div className="w-full flex-shrink-0 flex gap-2 px-3 py-1 items-center gap-y-1 hover:bg-black/[.03] dark:hover:bg-white/[.08]">
                    <div className="w-12 h-12 border-2 border-white rounded-full flex justify-center items-center">
                      <div className="w-[91%] h-[91%] rounded-full overflow-hidden bg-gray-300">
                        <img
                          src={`${BASE_URL}/${user.profilePicture}`}
                          alt={user.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[0.80rem] font-bold">
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-500">
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
        )}
      </div>
    </div>
  );
};

export default Topbar;
