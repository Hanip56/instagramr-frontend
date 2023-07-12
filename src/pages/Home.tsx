import { useSelector } from "react-redux";
import { HomeMain, Suggested, TopBar } from "../components";
import { selectCurrentUser } from "../app/features/auth/authSlice";

const Home = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <TopBar />
      {user.followings.length > 0 ? <HomeMain /> : <Suggested />}
    </>
  );
};

export default Home;
