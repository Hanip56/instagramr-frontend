import { useState } from "react";
import {
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlineHome,
  AiFillHome,
  AiOutlineInstagram,
  AiOutlineSearch,
  AiFillCompass,
} from "react-icons/ai";
import {
  IoPaperPlane,
  IoPaperPlaneOutline,
  IoPeopleCircle,
  IoPeopleCircleOutline,
} from "react-icons/io5";
import { MdMovieFilter, MdOutlineMovieFilter } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { MenuBar, SearchNavbar } from ".";

const Navbar = () => {
  const [searchBar, setSearchBar] = useState(false);
  const location = useLocation();

  const alternateBar = searchBar || location.pathname === "/direct/inbox";

  const handleCloseAlternateBar = () => {
    setSearchBar(false);
  };

  return (
    <>
      {searchBar && <SearchNavbar />}
      <div
        className={`${
          alternateBar ? "" : "lg:w-[244px]"
        } fixed z-10 bottom-0 w-full md:w-fit px-3 py-5 bg-lightBg dark:bg-darkBg md:min-h-[100dvh] flex flex-col text-darkText border border-transparent md:border-r-darkBg/10 dark:md:border-r-white/20`}
      >
        <div
          className={`text-lightText dark:text-darkText hidden my-6 md:flex justify-center ${
            alternateBar ? "" : "lg:justify-start"
          }`}
        >
          <div
            className={`hidden text-[25px] ${
              alternateBar ? "md:block" : "md:block lg:hidden"
            }`}
          >
            <AiOutlineInstagram />
          </div>
          <p className={`hidden ml-3 ${alternateBar ? "" : "lg:block"}`}>
            Instagram
          </p>
        </div>
        <div className="flex-grow flex flex-row items-center md:flex-col gap-y-2">
          <NavLink
            to={`/`}
            className="navList"
            onClick={handleCloseAlternateBar}
          >
            {({ isActive }) => (
              <>
                <span className="text-[25px] p-0 md:p-2 lg:p-3">
                  {(!isActive || (isActive && alternateBar)) && (
                    <AiOutlineHome />
                  )}
                  {isActive && !alternateBar && <AiFillHome />}
                </span>
                <span
                  className={`hidden ${
                    alternateBar ? "" : "lg:inline-block"
                  }  ${isActive ? "font-bold" : "font-medium"}`}
                >
                  Home
                </span>
              </>
            )}
          </NavLink>
          <li
            className={`navList hidden md:flex border ${
              searchBar ? "" : "border-transparent"
            }`}
            onClick={() => setSearchBar((prev) => !prev)}
          >
            <span className="text-[25px] p-0 md:p-2 lg:p-3">
              <AiOutlineSearch />
            </span>
            <span className={`hidden ${alternateBar ? "" : "lg:inline-block"}`}>
              Search
            </span>
          </li>
          <NavLink
            to={`/explore`}
            className="navList"
            onClick={handleCloseAlternateBar}
          >
            {({ isActive }) => (
              <>
                <span className="text-[25px] p-0 md:p-2 lg:p-3">
                  {(!isActive || (isActive && alternateBar)) && (
                    <AiOutlineCompass />
                  )}
                  {isActive && !alternateBar && <AiFillCompass />}
                </span>
                <span
                  className={`hidden ${
                    alternateBar ? "" : "lg:inline-block"
                  }  ${isActive ? "font-bold" : "font-medium"}`}
                >
                  Explore
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to={`/reels`}
            className="navList"
            onClick={handleCloseAlternateBar}
          >
            {({ isActive }) => (
              <>
                <span className="text-[25px] p-0 md:p-2 lg:p-3">
                  {(!isActive || (isActive && alternateBar)) && (
                    <MdOutlineMovieFilter />
                  )}
                  {isActive && !alternateBar && <MdMovieFilter />}
                </span>
                <span
                  className={`hidden ${
                    alternateBar ? "" : "lg:inline-block"
                  }  ${isActive ? "font-bold" : "font-medium"}`}
                >
                  Reels
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to={`/direct/inbox`}
            className="navList"
            onClick={handleCloseAlternateBar}
          >
            {({ isActive }) => (
              <>
                <span className="text-[25px] p-0 md:p-2 lg:p-3">
                  {!isActive && <IoPaperPlaneOutline />}
                  {isActive && <IoPaperPlane />}
                </span>
                <span
                  className={`hidden ${
                    alternateBar ? "" : "lg:inline-block"
                  }  ${isActive ? "font-bold" : "font-medium"}`}
                >
                  Messages
                </span>
              </>
            )}
          </NavLink>
          <li className="navList hidden md:flex">
            <span className="text-[25px] p-0 md:p-2 lg:p-3">
              <AiOutlineHeart />
            </span>
            <span className={`hidden ${alternateBar ? "" : "lg:inline-block"}`}>
              Notifications
            </span>
          </li>
          <li className="navList">
            <span className="text-[25px] p-0 md:p-2 lg:p-3">
              <FiPlusSquare />
            </span>
            <span className={`hidden ${alternateBar ? "" : "lg:inline-block"}`}>
              Create
            </span>
          </li>
          <NavLink
            to={`/halfz`}
            className="navList"
            onClick={handleCloseAlternateBar}
          >
            {({ isActive }) => (
              <>
                <span className="text-[25px] p-0 md:p-2 lg:p-3">
                  {(!isActive || (isActive && alternateBar)) && (
                    <IoPeopleCircleOutline />
                  )}
                  {isActive && !alternateBar && <IoPeopleCircle />}
                </span>
                <span
                  className={`hidden ${
                    alternateBar ? "" : "lg:inline-block"
                  }  ${isActive ? "font-bold" : "font-medium"}`}
                >
                  Profile
                </span>
              </>
            )}
          </NavLink>
        </div>
        {/* three bar */}
        <MenuBar alternateBar={alternateBar} />
      </div>
    </>
  );
};

export default Navbar;
