import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NormalChat from "../pages/chat/normal-chat";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HomePage from "../pages/home";
import GroupChat from "../pages/chat/group-chat";

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
          path: "",
          element: <HomePage />,
        },
        {
          path: "chat/group/:id",
          element: <GroupChat />,
        },
        {
          path: "chat/:id",
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
