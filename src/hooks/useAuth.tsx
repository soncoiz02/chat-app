import React from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { setSession } from "../services/auth";

const useAuth = () => {
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const saveToken = (accessToken: string) => {
    const decode = jwtDecode<any>(accessToken);
    console.log({ decode, accessToken, cookies });

    setCookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(decode.exp),
      sameSite: "strict",
    });

    setSession({ accessToken });
  };

  const isLogin = () => !!cookies["accessToken"];

  return { saveToken, isLogin };
};

export default useAuth;
