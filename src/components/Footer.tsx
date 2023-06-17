import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full text-gray-500/80 dark:text-white/40 flex flex-col text-center sm:p-4">
      <div className="w-full text-xs leading-6 flex justify-center items-center gap-x-4 sm:gap-x-6 p-2 flex-wrap">
        <Link to="#">About</Link>
        <Link to="#">Help</Link>
        <Link to="#">Press</Link>
        <Link to="#">API</Link>
        <Link to="#">Jobs</Link>
        <Link to="#">Privacy</Link>
        <Link to="#">Terms</Link>
        <Link to="#">Locations</Link>
        <Link to="#">Language</Link>
      </div>
      <h4 className="text-xs sm:text-sm mt-3">
        &copy; {new Date().getFullYear()} INSTAGRAMR BY HANIP .A
      </h4>
    </div>
  );
};

export default Footer;
