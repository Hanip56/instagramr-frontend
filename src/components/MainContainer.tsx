import { useSelector } from "react-redux";
import { ModalCardOptions, ModalCreate, ModalPost, SkeletonModalPost } from ".";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { RootState } from "../app/store";

const MainContainer = () => {
  const { modalCardOptions, modalPost, modalCreate } = useSelector(
    (state: RootState) => state.modal
  );

  const location = useLocation();

  return (
    <>
      {modalCardOptions && <ModalCardOptions />}
      {modalPost && <ModalPost />}
      {modalCreate && <ModalCreate />}

      <div className="flex text-lightText dark:text-darkText">
        <Navbar />
        {/* main */}
        <div
          className={`ml-0 pb-16 md:pb-0 md:ml-[4.5rem] flex-1 min-h-[calc(100vh-45px)] md:min-h-screen ${
            location.pathname === "/direct/inbox" ? "" : "lg:ml-[244px]"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainContainer;
