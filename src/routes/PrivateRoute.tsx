import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isLogin } = useAuth();
  if (!isLogin) return <Navigate to="/auth/login" />;

  return children;
};

export default PrivateRoute;
