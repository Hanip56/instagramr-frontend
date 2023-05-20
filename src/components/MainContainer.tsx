import { useSelector } from "react-redux";
import { ModalCardOptions, ModalPost, SkeletonModalPost } from ".";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { RootState } from "../app/store";

const MainContainer = () => {
  const { modalCardOptions, modalPost } = useSelector(
    (state: RootState) => state.modal
  );

  return (
    <>
      {modalCardOptions && <ModalCardOptions />}
      {modalPost && <ModalPost />}

      <div className="flex">
        <Navbar />
        {/* main */}
        <div className="ml-0 md:ml-[4.5rem] lg:ml-[244px] flex-1 text-lightText dark:text-darkText">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainContainer;
