import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NormalChat from "../pages/normal-chat";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/chat",
          element: <NormalChat />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routers;
