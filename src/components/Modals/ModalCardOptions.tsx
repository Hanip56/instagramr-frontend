import { useDispatch } from "react-redux";
import { hideModalCardOptions } from "../../app/features/modal/modalSlice";

const ModalCardOptions = () => {
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModalCardOptions());
  };

  const handleUnfollow = async () => {
    console.log("handleUnfollow");
  };

  return (
    <>
      <div
        className="fixed z-[45] w-screen h-screen bg-black/60 left-0 top-0"
        onClick={handleHideModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] z-50 flex justify-center items-center rounded-lg">
        <div className="w-[80vw] xs:w-[25rem] bg-white dark:bg-grayIg rounded-lg overflow-hidden flex flex-col divide-y-[1px] text-sm animate-fadeIn text-lightText dark:text-darkText">
          {/* <button className="w-full py-3 active:bg-gray-300/30 ">Open</button> */}
          <button
            className="w-full py-3 active:bg-gray-300/30 text-red-500 font-semibold"
            onClick={handleUnfollow}
          >
            Unfollow
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

export default ModalCardOptions;
