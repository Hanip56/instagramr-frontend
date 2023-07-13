import logo from "../../assets/logo.png";

const LoadingPages = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <img src={logo} alt="instagramr-logo" className="w-20" />
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xl font-semibold text-amber-900">
        INSTAGRAMR
      </p>
    </div>
  );
};

export default LoadingPages;
