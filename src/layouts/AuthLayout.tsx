import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthLayout = () => {
  return (
    <AuthBackground>
      <Outlet />
    </AuthBackground>
  );
};

const AuthBackground = styled("div")`
  background: #efefef;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export default AuthLayout;
