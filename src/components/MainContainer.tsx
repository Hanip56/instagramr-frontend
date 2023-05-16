import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  return (
    <div className="flex">
      <Navbar />
      {/* main */}
      <div className="flex-1 text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default MainContainer;
