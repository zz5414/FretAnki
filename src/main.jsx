import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import StageDetailScreen from "./screens/StageDetailScreen";
import PracticeScreen from "./screens/PracticeScreen";
import MelodyPracticeScreen from "./screens/MelodyPracticeScreen";
import Layout from "./components/Layout";
import TutorialView from "./components/TutorialView";

const Main = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/stage-detail",
          element: <StageDetailScreen />,
        },
        {
          path: "/stage-detail/tutorial",
          element: <TutorialView />,
        },
        {
          path: "/practice",
          element: <PracticeScreen />,
        },
        {
          path: "/melody-practice",
          element: <MelodyPracticeScreen />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
