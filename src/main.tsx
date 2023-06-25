import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Edit, Explore, Home, Messages, Profile, Reels, Saved } from "./pages";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import {
  PostsSection,
  SavedSection,
  StarterContainer,
  TaggedSection,
} from "./components/index.ts";
import App from "./App.tsx";
import MainContainer from "./components/MainContainer.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <StarterContainer />,
      },
      {
        path: "/signup",
        element: <StarterContainer />,
      },
      {
        path: "/",
        element: <MainContainer />,
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
          {
            path: "/:username/saved/:collection",
            element: <Saved />,
          },
          {
            path: "accounts/edit",
            element: <Edit />,
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
