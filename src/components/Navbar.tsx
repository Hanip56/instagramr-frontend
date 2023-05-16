import {
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlineHome,
  AiFillHome,
  AiOutlineInstagram,
  AiOutlineSearch,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { BiMoviePlay, BiTagAlt } from "react-icons/bi";
import { IoPaperPlaneOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { HiBars3 } from "react-icons/hi2";
import { TbMessageReport, TbMoon, TbSettings } from "react-icons/tb";
import { useState, createRef } from "react";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

const Navbar = () => {
  const [showBar, setShowBar] = useState(false);
  const barRef = createRef<HTMLDivElement>();
  const moreBtnRef = createRef<HTMLButtonElement>();

  useOutsideAlerter(barRef, setShowBar, moreBtnRef);

  return (
    <div className="fixed bottom-0 sm:relative w-full sm:w-fit lg:basis-[244px] px-3 py-5 bg-darkBg sm:min-h-[100dvh] flex flex-col text-darkText border border-transparent sm:border-r-white/20">
      <div className="hidden my-6 sm:flex justify-center lg:justify-start">
        <div className="hidden sm:block lg:hidden text-[25px]">
          <AiOutlineInstagram />
        </div>
        <p className="hidden lg:block ml-3">Instagram</p>
      </div>
      <ul className="flex-grow flex flex-row items-center sm:flex-col gap-y-2">
        <li className="navList">
          <span className="text-[25px] p-0 sm:p-2 lg:p-3">
            {/* <AiOutlineHome /> */}
            <AiFillHome />
          </span>
          <span className="hidden lg:inline-block font-bold">Home</span>
        </li>
        <li className="navList hidden sm:flex">
          <span className="text-[25px] p-0 sm:p-2 lg:p-3">
            <AiOutlineSearch />
          </span>
          <span className="hidden lg:inline-block">Search</span>
        </li>
        <li className="navList">
          <span className="text-[25px] p-0 sm:p-2 lg:p-3">
            <AiOutlineCompass />
          </span>
          <span className="hidden lg:inline-block">Explore</span>
        </li>
        <li className="navList">
          <span className="text-[25px] p-0 sm:p-2 lg:p-3">
            <BiMoviePlay />
          </span>
          <span className="hidden lg:inline-block">Reels</span>
        </li>
        <li className="navList">
          <span className="text-[25px] p-0 sm:p-2 lg:p-3">
            <IoPaperPlaneOutline />
          </span>
          <span className="hidden lg:inline-block">Messages</span>
        </li>
        <li className="navList hidden sm:flex">
          <span className="text-[25px] p-0 sm:p-2 lg:p-3">
            <AiOutlineHeart />
          </span>
          <span className="hidden lg:inline-block">Notifications</span>
        </li>
        <li className="navList">
          <span className="text-[25px] p-0 sm:p-2 lg:p-3">
            <FiPlusSquare />
          </span>
          <span className="hidden lg:inline-block">Create</span>
        </li>
        <li className="navList">
          <span className="text-[25px] p-0 sm:p-2 lg:p-3">
            <IoPersonCircleOutline />
          </span>
          <span className="hidden lg:inline-block">Profile</span>
        </li>
      </ul>
      {/* three bar */}
      <div className="hidden sm:block relative">
        <button
          aria-label="show menu bar"
          onClick={() => setShowBar((prev) => !prev)}
          className="navList cursor-pointer"
          ref={moreBtnRef}
        >
          <span className="text-3xl p-0 sm:p-2 lg:p-3">
            <HiBars3 />
          </span>
          <span className="hidden lg:inline-block">More</span>
        </button>
        {/* bar menu */}
        {showBar && (
          <div
            ref={barRef}
            className="absolute -right-[16.7rem] bottom-0 lg:left-0 lg:bottom-[3.7rem] p-2 text-sm rounded-2xl w-[266px] h-[404.5px] bg-grayIg"
          >
            <a href="#" className="navList px-1">
              <span className="text-2xl p-3">
                <TbSettings />
              </span>
              <span>Settings</span>
            </a>
            <a href="#" className="navList px-1">
              <span className="text-2xl p-3">
                <AiOutlineFieldTime />
              </span>
              <span>Your activity</span>
            </a>
            <a href="#" className="navList px-1">
              <span className="text-2xl p-3">
                <BiTagAlt />
              </span>
              <span>Saved</span>
            </a>
            <a href="#" className="navList px-1">
              <span className="text-2xl p-3">
                <TbMoon />
              </span>
              <span>Switch appearance</span>
            </a>
            <a href="#" className="navList px-1">
              <span className="text-2xl p-3">
                <TbMessageReport />
              </span>
              <span>Report a problem</span>
            </a>
            <div className="w-[calc(100%+16px)] my-2 h-2 bg-slate-500/20 -m-2" />
            <div className="navList px-1">
              <span className="p-4">Switch accounts</span>
            </div>
            <div className="w-[calc(100%+16px)] my-2 h-1 bg-slate-500/20 -m-2" />
            <div className="navList px-1">
              <span className="p-4">Log out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
