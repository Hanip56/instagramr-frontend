import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BASE_URL } from "./constants";
import { setCredentials } from "./app/features/auth/authSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRefresh = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
          credentials: "include",
        });
        const data = await res.json();

        if (data) {
          dispatch(setCredentials({ ...data }));
        }
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRefresh();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (errorMessage) return <p>{errorMessage}</p>;

  return <Outlet />;
};

export default App;
