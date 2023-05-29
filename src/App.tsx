import { Navigate } from "react-router-dom";
import MainContainer from "./components/MainContainer";

const App = () => {
  const token = false;
  return (
    <>{token ? <MainContainer /> : <Navigate to="/login" replace={true} />}</>
  );
};

export default App;
