import { useSelector } from "react-redux";
import {
  ModalCardOptions,
  ModalOwnCardOptions,
  ModalCreate,
  ModalPost,
} from ".";
import Navbar from "./Navbar";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { RootState } from "../app/store";
import usePreventScroll from "../hooks/usePreventScroll";
import ModalEdit from "./Modals/ModalEdit";

const MainContainer = () => {
  const {
    modalCardOptions,
    modalOwnCardOptions,
    modalPost,
    modalCreate,
    modalEdit,
  } = useSelector((state: RootState) => state.modal);
  const { token } = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  usePreventScroll([
    modalCardOptions,
    modalPost,
    modalCreate,
    modalOwnCardOptions,
    modalEdit,
  ]);

  if (!token) {
    console.log({ token });
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      {modalCardOptions && <ModalCardOptions />}
      {modalOwnCardOptions && <ModalOwnCardOptions />}
      {modalPost && <ModalPost />}
      {modalEdit && <ModalEdit />}
      {modalCreate && <ModalCreate />}

      <ScrollRestoration getKey={(location) => location.pathname} />
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
