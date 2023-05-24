import React from "react";
import {
  BsCameraVideo,
  BsHeart,
  BsImage,
  BsInfoCircle,
  BsMic,
  BsTelephone,
} from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import postImage from "../dummyData/postImage.jpg";
import { VscSmiley } from "react-icons/vsc";

const Messages = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] sm:h-[calc(100vh-66px)] md:h-screen">
      {/* left side */}
      <div className="w-[fit] md:w-[397px] flex flex-col h-full border border-transparent border-r-grayIg/10 dark:border-r-lightBg/20">
        <div className="flex items-center justify-center md:justify-between p-6 py-8 text-xl ">
          <div className="font-bold hidden md:inline">
            <span>halfz</span>
          </div>
          <span className="text-2xl">
            <FiEdit />
          </span>
        </div>
        <div className="hidden px-6 md:flex items-center justify-between">
          <h1 className="text-lg font-bold">Messages</h1>
          <a
            href="#"
            className="text-gray-400 hover:opacity-50 font-semibold text-sm"
          >
            Requests
          </a>
        </div>

        <div className="w-full overflow-y-auto">
          {Array(30)
            .fill("")
            .map((key, idx) => (
              <Link to={`/halfz`} key={idx}>
                <div className="w-full py-2 px-6 flex-shrink-0 flex gap-2 items-center gap-y-1 hover:bg-gray-100/50 dark:hover:bg-lightBg/10">
                  <div className="w-16 h-16 flex-shrink-0 border-2 border-white rounded-full flex justify-center items-center">
                    <div className="w-[91%] h-[91%] rounded-full bg-gray-300"></div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-bold">Halfz</p>
                    <p className="text-xs tracking-wide text-gray-400">
                      Messages Sent
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {/* right side */}

      {/* chosed */}
      <div className="flex-1 flex flex-col">
        <header className="w-full flex justify-between items-center p-4">
          <Link to={`/halfz`}>
            <div className="w-full flex-shrink-0 flex gap-3 items-center gap-y-1 hover:bg-gray-100/50 dark:hover:bg-lightBg/10">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div>
                <p className="text-sm font-bold">Halfz</p>
                <p className="text-xs tracking-wide text-gray-400">
                  Messages Sent
                </p>
              </div>
            </div>
          </Link>
          <div className="flex gap-4 text-2xl">
            <span>
              <BsTelephone />
            </span>
            <span>
              <BsCameraVideo />
            </span>
            <span>
              <BsInfoCircle />
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 border border-transparent border-t-grayIg/10 dark:border-t-lightBg/20">
          <div className="w-full flex flex-col gap-4 justify-center items-center my-8">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <img
                src={postImage}
                alt="postImage"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-lg">Halfz</span>
            <button className="igButton">View profile</button>
          </div>

          {/* chat */}
        </main>
        <footer className="p-4">
          <div className="p-3 px-4 flex gap-2 items-center border border-grayIg/10 dark:border-lightBg/20 rounded-full">
            <span className="text-2xl">
              <VscSmiley />
            </span>
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 text-sm bg-transparent"
            />
            <div className="flex gap-4 text-2xl mr-3">
              <span>
                <BsMic />
              </span>
              <span>
                <BsImage />
              </span>
              <span>
                <BsHeart />
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Messages;
