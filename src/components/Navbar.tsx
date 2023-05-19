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
import { NavLink } from "react-router-dom";
import { MenuBar } from ".";

const Navbar = () => {
  return (
    <div className="fixed z-10 bottom-0 w-full md:w-fit lg:w-[244px] px-3 py-5 bg-lightBg dark:bg-darkBg md:min-h-[100dvh] flex flex-col text-darkText border border-transparent md:border-r-darkBg/10 dark:md:border-r-white/20">
      <div className="text-lightText dark:text-darkText hidden my-6 md:flex justify-center lg:justify-start">
        <div className="hidden md:block lg:hidden text-[25px]">
          <AiOutlineInstagram />
        </div>
        <p className="hidden lg:block ml-3">Instagram</p>
      </div>
      <div className="flex-grow flex flex-row items-center md:flex-col gap-y-2">
        <NavLink to={`/`} className="navList">
          {({ isActive }) => (
            <>
              <span className="text-[25px] p-0 md:p-2 lg:p-3">
                {!isActive && <AiOutlineHome />}
                {isActive && <AiFillHome />}
              </span>
              <span
                className={`hidden lg:inline-block ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                Home
              </span>
            </>
          )}
        </NavLink>
        <li className="navList hidden md:flex">
          <span className="text-[25px] p-0 md:p-2 lg:p-3">
            <AiOutlineSearch />
          </span>
          <span className="hidden lg:inline-block">Search</span>
        </li>
        <NavLink to={`/explore`} className="navList">
          {({ isActive }) => (
            <>
              <span className="text-[25px] p-0 md:p-2 lg:p-3">
                {!isActive && <AiOutlineCompass />}
                {isActive && <AiFillCompass />}
              </span>
              <span
                className={`hidden lg:inline-block ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                Explore
              </span>
            </>
          )}
        </NavLink>
        <NavLink to={`/reels`} className="navList">
          {({ isActive }) => (
            <>
              <span className="text-[25px] p-0 md:p-2 lg:p-3">
                {!isActive && <MdOutlineMovieFilter />}
                {isActive && <MdMovieFilter />}
              </span>
              <span
                className={`hidden lg:inline-block ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                Reels
              </span>
            </>
          )}
        </NavLink>
        <NavLink to={`/direct/inbox`} className="navList">
          {({ isActive }) => (
            <>
              <span className="text-[25px] p-0 md:p-2 lg:p-3">
                {!isActive && <IoPaperPlaneOutline />}
                {isActive && <IoPaperPlane />}
              </span>
              <span
                className={`hidden lg:inline-block ${
                  isActive ? "font-bold" : "font-medium"
                }`}
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
          <span className="hidden lg:inline-block">Notifications</span>
        </li>
        <li className="navList">
          <span className="text-[25px] p-0 md:p-2 lg:p-3">
            <FiPlusSquare />
          </span>
          <span className="hidden lg:inline-block">Create</span>
        </li>
        <NavLink to={`/halfz`} className="navList">
          {({ isActive }) => (
            <>
              <span className="text-[25px] p-0 md:p-2 lg:p-3">
                {!isActive && <IoPeopleCircleOutline />}
                {isActive && <IoPeopleCircle />}
              </span>
              <span
                className={`hidden lg:inline-block ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                Profile
              </span>
            </>
          )}
        </NavLink>
      </div>
      {/* three bar */}
      <MenuBar />
    </div>
  );
};

export default Navbar;
