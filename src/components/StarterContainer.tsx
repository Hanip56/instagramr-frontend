import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../app/store";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const StarterContainer = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (token) {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/login") {
    return <SignIn />;
  }

  return <SignUp />;
};

export default StarterContainer;
