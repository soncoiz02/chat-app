import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const isLogin = false;

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  if (!isLogin) return <Navigate to="/auth/login" />;

  return children;
};

export default PrivateRoute;
