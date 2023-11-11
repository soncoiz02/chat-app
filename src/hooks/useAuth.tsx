import React from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { setSession } from "../services/auth";
import { UserType } from "../types/user";
import { useAppDispatch } from "../redux/hook";
import { saveUserInfo } from "../redux/features/user/userSlice";
import { getSeconds } from "date-fns";

type AuthInfo = {
  accessToken: string;
  userInfo: UserType;
};

const useAuth = () => {
  const [cookies, setCookie] = useCookies(["accessToken", "userInfo"]);

  const dispatch = useAppDispatch();

  const whoIAm = () => {
    if (cookies["userInfo"]) {
      const userInfo = cookies["userInfo"];
      dispatch(saveUserInfo(userInfo));
    }
  };

  const saveAuthInfo = (authInfo: AuthInfo) => {
    const { accessToken, userInfo } = authInfo;

    const decode = jwtDecode<any>(accessToken);

    let diff = (decode.exp * 1000 - new Date().getTime()) / 1000;
    diff /= 60 * 60;

    const cookieMaxAge = Math.abs(Math.round(diff)) * 60 * 60;

    setCookie("accessToken", accessToken, { maxAge: cookieMaxAge });

    setCookie("userInfo", JSON.stringify(userInfo), { maxAge: cookieMaxAge });

    setSession({ accessToken });
  };

  const initialization = () => {
    whoIAm();
    setSession({ accessToken: cookies["accessToken"] });
  };

  const isLogin = () => {
    return !!cookies["accessToken"];
  };

  const getUserId = () => {
    const accessToken = cookies["accessToken"];
    return jwtDecode<any>(accessToken)._id;
  };

  return { whoIAm, isLogin, saveAuthInfo, initialization, getUserId };
};

export default useAuth;
