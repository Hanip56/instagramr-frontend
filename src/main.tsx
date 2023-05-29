import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Explore, Home, Messages, Profile, Reels } from "./pages";
import MainContainer from "./components/MainContainer.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import {
  PostsSection,
  SavedSection,
  TaggedSection,
} from "./components/index.ts";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "reels",
        element: <Reels />,
      },
      {
        path: "direct/inbox",
        element: <Messages />,
      },
      {
        path: ":username",
        element: <Profile />,
        children: [
          {
            path: "",
            element: <PostsSection />,
          },
          {
            path: "saved",
            element: <SavedSection />,
          },
          {
            path: "tagged",
            element: <TaggedSection />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
