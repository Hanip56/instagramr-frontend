import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";

const NotifNavbar = forwardRef<HTMLDivElement>((_, ref) => {
  const notifications = [];

  return (
    <div
      ref={ref}
      className="w-[397px] h-full overflow-y-scroll hidden md:flex flex-col fixed top-0 bottom-0 left-[4.75rem] text-lightText dark:text-darkText bg-lightBg dark:bg-darkBg z-20"
    >
      <h1 className="font-semibold text-2xl mb-10 m-6">Notifications</h1>
      <div className="border border-transparent border-t-grayIg/10 dark:border-t-gray-200/20 p-6">
        <div className="flex flex-col gap-3">
          {/* <h2 className="mb-4 font-bold">Earlier</h2> */}
          {notifications.length < 1 && (
            <div className="text-sm flex flex-col text-center gap-4 justify-center items-center">
              <div className="w-12 h-12 border rounded-full flex justify-center items-center text-xl">
                <BsHeart />
              </div>
              <p>Activity On Your Posts</p>
              <p>
                When someone likes or comments on one of your posts, you'll see
                it here.
              </p>
            </div>
          )}
          {notifications.length > 0 &&
            Array(4)
              .fill("")
              .map((key, idx) => (
                <Link to={`/halfz`} key={idx}>
                  <div className="w-fit flex-shrink-0 flex gap-4 items-center gap-y-1">
                    <div className="w-16 h-16 border-2 flex-shrink-0 border-white rounded-full flex justify-center items-center">
                      <div className="w-[91%] h-[91%] rounded-full bg-gray-300"></div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <b>Halfz </b>
                        <span>
                          Some Information Lorem, ipsum dolor sit amet
                          consectetur adipisicing elit.
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
});

export default NotifNavbar;
