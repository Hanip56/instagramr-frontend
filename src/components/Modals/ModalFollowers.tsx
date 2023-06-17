import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/features/auth/authSlice";
import { Link } from "react-router-dom";
import { BsXLg } from "react-icons/bs";
import { BASE_URL } from "../../constants";
import { UserType } from "../../../types";

type PropTypes = {
  hide: () => void;
};

const ModalFollowers = ({ hide }: PropTypes) => {
  const user = useSelector(selectCurrentUser) as UserType;

  const handleHideModal = () => {
    hide();
  };

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-lg">
        <div className="w-[80vw] xs:w-[25rem] bg-white dark:bg-grayIg rounded-lg overflow-hidden flex flex-col divide-y-[1px] divide-darkBg/10 dark:divide-white/10 text-sm animate-fadeIn text-lightText dark:text-darkText">
          <header className="flex items-center justify-between text-center p-3 px-4 font-semibold">
            <span className="basis-4"></span>
            <span>Followers</span>
            <button onClick={hide} className="text-xl basis-4">
              <BsXLg />
            </button>
          </header>
          <main className="basis-80 overflow-y-scroll">
            {Array(10)
              .fill("")
              ?.map((_, i) => (
                <Link to={`/${user.username}`} key={i} onClick={hide}>
                  <div className="w-full flex-shrink-0 flex gap-4 px-6 py-2 items-center gap-y-1">
                    <div className="w-12 h-12 border border-white rounded-full flex justify-center items-center">
                      <div className="w-[95%] h-[95%] rounded-full overflow-hidden bg-gray-300">
                        <img
                          src={`${BASE_URL}/${user.profilePicture}`}
                          alt={user.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{user.username}</p>
                      <p className="text-xs tracking-widest text-gray-400">
                        <span>{user?.fullname}</span>
                      </p>
                    </div>
                    <button className="igButtonBlue ml-auto">Follow</button>
                  </div>
                </Link>
              ))}
          </main>
        </div>
      </div>
    </>
  );
};

export default ModalFollowers;
