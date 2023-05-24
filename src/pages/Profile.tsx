import { BiUserPlus } from "react-icons/bi";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { MdOutlineGridOn, MdOutlinePersonPin } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();

  const section = location.pathname.split("/")[2];

  console.log({ section });

  const profileButtonsContainer = (
    <div className="flex items-center gap-2">
      <button className="igButton">
        <span>Following</span>
      </button>
      <button className="igButton">
        <span>Message</span>
      </button>
      <button className="igButton text-xl">
        <BiUserPlus />
      </button>
    </div>
  );

  return (
    <div className="max-w-[1013px] px-0 md:px-4 mx-auto flex flex-col pt-6">
      <header className="max-w-[935px] py-2 px-2 md:px-6 flex flex-col gap-6 mb-6 md:mb-12">
        <div className="w-full flex gap-6 items-center gap-y-10">
          <div className="md:basis-[35%] flex justify-center items-center">
            <div className="w-24 h-24 md:w-36 md:h-36 flex-shrink-0 border-2 border-white rounded-full flex justify-center items-center">
              <div className="w-[91%] h-[91%] rounded-full bg-gray-300"></div>
            </div>
          </div>

          <div className="md:block flex-1 space-y-4 md:space-y-7">
            <div className="flex items-center gap-6">
              <span>one</span>
              <div className="hidden md:block">{profileButtonsContainer}</div>
              <button className="text-2xl">
                <BsThreeDots />
              </button>
            </div>
            {/* status */}
            <ul className="hidden md:flex gap-12 text-base">
              <li>
                <span className="font-bold">9,276</span> <span>posts</span>
              </li>
              <li>
                <span className="font-bold">595K</span> <span>followers</span>
              </li>
              <li>
                <span className="font-bold">359</span> <span>following</span>
              </li>
            </ul>
            {/* buttons container for mobile screen */}
            <div className="block md:hidden">{profileButtonsContainer}</div>
            {/* bio */}
            <div className="hidden md:block">
              <p>Bio heree !!!</p>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <p>Bio for small screen heree !!!</p>
        </div>
      </header>

      {/* status info for small screen */}
      <ul className="flex py-4 text-sm md:hidden gap-12 border border-transparent border-t-grayIg/10 dark:border dark:border-t-lightBg/20 text-center">
        <li className="flex-1">
          <span className="font-bold">9,276</span> <br />
          <span>posts</span>
        </li>
        <li className="flex-1">
          <span className="font-bold">595K</span> <br />
          <span>followers</span>
        </li>
        <li className="flex-1">
          <span className="font-bold">359</span>
          <br /> <span>following</span>
        </li>
      </ul>
      {/* section navigation*/}
      <div className="w-full flex items-center md:justify-center text-xs font-semibold md:gap-24 border border-transparent border-t-grayIg/10 dark:border dark:border-t-lightBg/20">
        <Link
          to=""
          className={`flex-1 md:flex-grow-0 py-4 flex justify-center gap-2 items-center border-2 border-transparent ${
            section === undefined ? "border-t-darkBg dark:border-t-lightBg" : ""
          }`}
        >
          <span>
            <MdOutlineGridOn />
          </span>
          <span>POSTS</span>
        </Link>
        <Link
          to="saved"
          className={`flex-1 md:flex-grow-0 py-4 flex justify-center gap-2 items-center border-2 border-transparent ${
            section === "saved" ? "border-t-darkBg dark:border-t-lightBg" : ""
          }`}
        >
          <span>
            <BsBookmark />
          </span>
          <span>SAVED</span>
        </Link>
        <Link
          to="tagged"
          className={`flex-1 md:flex-grow-0 py-4 flex justify-center gap-2 items-center border-2 border-transparent ${
            section === "tagged" ? "border-t-darkBg dark:border-t-lightBg" : ""
          }`}
        >
          <span className="text-lg">
            <MdOutlinePersonPin />
          </span>
          <span>TAGGED</span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
