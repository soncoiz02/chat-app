import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isLogin, initialization } = useAuth();
  if (!isLogin()) return <Navigate to="/auth/login" />;
  initialization();
  return children;
};

export default PrivateRoute;
