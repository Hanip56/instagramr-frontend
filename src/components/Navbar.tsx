import { createRef, useState } from "react";
import {
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlineHome,
  AiFillHome,
  AiOutlineInstagram,
  AiOutlineSearch,
  AiFillCompass,
  AiFillHeart,
} from "react-icons/ai";
import { IoPaperPlane, IoPaperPlaneOutline } from "react-icons/io5";
import { MdMovieFilter, MdOutlineMovieFilter } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { MenuBar, NotifNavbar, SearchNavbar } from ".";
import { useDispatch, useSelector } from "react-redux";
import { showModalCreate } from "../app/features/modal/modalSlice";
import { selectCurrentUser } from "../app/features/auth/authSlice";
import { BASE_URL } from "../constants";
import useOutsideAlerterDoubleRef from "../hooks/useOutsideAlerterDoubleRef";

const Navbar = () => {
  const [searchBar, setSearchBar] = useState(false);
  const [notifBar, setNotifBar] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navRef = createRef<HTMLDivElement>();
  const searchNavRef = createRef<HTMLDivElement>();
  const searchNotifRef = createRef<HTMLDivElement>();

  const regexForMessagePage = new RegExp(/^\/direct(?:\/(.*))?$/);
  const alternateBar =
    searchBar || notifBar || regexForMessagePage.test(location.pathname);

  const handleCloseAlternateBar = () => {
    setSearchBar(false);
    setNotifBar(false);
  };

  const handleCreateButton = () => {
    dispatch(showModalCreate());
  };

  useOutsideAlerterDoubleRef(navRef, setSearchBar, searchNavRef);
  useOutsideAlerterDoubleRef(navRef, setNotifBar, searchNotifRef);

  return (
    <>
      {searchBar && (
        <SearchNavbar
          ref={searchNavRef}
          handleCloseSearchBar={() => setSearchBar(false)}
        />
      )}
      {notifBar && <NotifNavbar ref={searchNotifRef} />}

      <div
        ref={navRef}
        className={`${
          alternateBar ? "" : "lg:w-[244px]"
        } fixed z-40 bottom-0 w-full md:w-fit px-3 py-5 bg-lightBg dark:bg-darkBg md:min-h-[100dvh] flex flex-col text-darkText border border-transparent md:border-r-darkBg/10 dark:md:border-r-white/20`}
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
            InstagramR
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
            onClick={() => {
              setSearchBar((prev) => !prev);
              setNotifBar(false);
            }}
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
            to={`/direct`}
            className="navList"
            onClick={handleCloseAlternateBar}
          >
            {({ isActive }) => (
              <>
                <span className="text-[25px] p-0 md:p-2 lg:p-3">
                  {(!isActive || (isActive && (searchBar || notifBar))) && (
                    <IoPaperPlaneOutline />
                  )}
                  {isActive && !(searchBar || notifBar) && <IoPaperPlane />}
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
          <li
            className={`navList hidden md:flex border ${
              notifBar ? "" : "border-transparent"
            }`}
            onClick={() => {
              setNotifBar((prev) => !prev);
              setSearchBar(false);
            }}
          >
            <span className="text-[25px] p-0 md:p-2 lg:p-3">
              {!notifBar && <AiOutlineHeart />}
              {notifBar && <AiFillHeart />}
            </span>
            <span className={`hidden ${alternateBar ? "" : "lg:inline-block"}`}>
              Notifications
            </span>
          </li>
          <li className="navList" onClick={handleCreateButton}>
            <span className="text-[25px] p-0 md:p-2 lg:p-3">
              <FiPlusSquare />
            </span>
            <span className={`hidden ${alternateBar ? "" : "lg:inline-block"}`}>
              Create
            </span>
          </li>
          <NavLink
            to={`/${user?.slug}`}
            className="navList"
            onClick={handleCloseAlternateBar}
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-[25px] h-[25px] rounded-full overflow-hidden m-0 md:m-2 lg:m-3 ${
                    isActive ? "border-2" : ""
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={`${BASE_URL}/${user?.profilePicture}`}
                      alt={user?.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
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
