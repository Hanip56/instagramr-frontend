import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  return (
    <div className="flex">
      <Navbar />
      {/* main */}
      <div className="ml-0 md:ml-[4.5rem] lg:ml-[244px] flex-1 text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default MainContainer;
