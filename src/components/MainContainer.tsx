import Navbar from "./Navbar";

const MainContainer = () => {
  return (
    <div className="flex">
      <Navbar />
      {/* main */}
      <div className="flex-1"></div>
    </div>
  );
};

export default MainContainer;
