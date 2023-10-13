import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NormalChat from "../pages/normal-chat";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "/chat",
          element: <NormalChat />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routers;
