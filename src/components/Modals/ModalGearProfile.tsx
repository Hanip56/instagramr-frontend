import { useDispatch } from "react-redux";
import { hideModalCardOptions } from "../../app/features/modal/modalSlice";
import { useLogoutMutation } from "../../app/features/auth/authApiSlice";
import { logout as logoutState } from "../../app/features/auth/authSlice";
import apiSlice from "../../app/api/api";
import { useNavigate } from "react-router-dom";

type PropTypes = {
  hide: () => void;
};

const ModalGearProfile = ({ hide }: PropTypes) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleHideModal = () => {
    hide();
  };

  const handleLogout = async () => {
    await logout();

    // reset cached data
    dispatch(logoutState());
    dispatch(apiSlice.util.resetApiState());
    dispatch(
      apiSlice.util.invalidateTags([
        "ExplorePost",
        "FollowingPost",
        "SinglePost",
      ])
    );
    navigate("/login");
  };

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-lg">
        <div className="w-[80vw] xs:w-[25rem] bg-white dark:bg-grayIg rounded-lg overflow-hidden flex flex-col divide-y-[1px] divide-darkBg/10 dark:divide-white/10 text-sm animate-fadeIn text-lightText dark:text-darkText">
          <button
            className="w-full py-3 active:bg-gray-300/30"
            onClick={handleLogout}
          >
            Log out
          </button>
          <button
            className="w-full py-3 active:bg-gray-300/30"
            onClick={handleHideModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalGearProfile;
