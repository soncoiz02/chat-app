import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import styled from "styled-components";

import LoginImage from "../../assets/login.png";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormProvider from "../../components/RHF/FormProvider";
import RHFTextField from "../../components/RHF/RHFTextField";
import { LoginFormType } from "../../types/auth";
import {
  disappear,
  fadeIn,
  leftIn,
  leftInReverse,
  righInReverse,
  rightIn,
} from "../../utils/keyframs";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isNavigate, setIsNavigate] = useState<boolean>(false);

  const navigate = useNavigate();

  // styled components

  const ImgWrapper = styled(Stack)`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    opacity: 0;
    height: 100%;
    img {
      width: 90%;
    }

    animation: ${isNavigate ? leftInReverse : leftIn} 1.5s ease-out forwards;
    animation-delay: ${isNavigate ? "0" : "1s"};
  `;

  const LoginBox = styled(Stack)`
    height: 100%;
    box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
      0px 12px 24px -4px rgba(145, 158, 171, 0.12);
    background: white;
    animation: ${isNavigate ? righInReverse : rightIn} 1s ease-out forwards;
    z-index: 2;
    padding: 30px 80px;
  `;

  const LoginWrapper = styled(Stack)`
    opacity: 0;
    animation: ${isNavigate ? disappear : fadeIn} 1s forwards;
    animation-delay: ${isNavigate ? "0" : "1s"};
  `;

  // yup validation

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email("Email type must be abc@gmail.com")
      .required("Email is required"),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  // handle form

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const handleLogin: SubmitHandler<LoginFormType> = (values) => {
    console.log(values);
  };

  // handle show password

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // handle switch page

  const handleSwitchPage = () => {
    setIsNavigate(true);
    setTimeout(() => {
      navigate("/auth/register");
    }, 1500);
  };

  return (
    <Stack direction="row" width="100%" height="100%" justifyContent="flex-end">
      <ImgWrapper alignItems="center" justifyContent="center">
        <img src={LoginImage} alt="Login Image" />
      </ImgWrapper>
      <LoginBox justifyContent="center" alignItems="center">
        <LoginWrapper
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            width="100%"
            justifyContent="center"
            alignItems="center"
            mb={8}
            mt={8}
          >
            <Typography variant="h3" fontWeight={800}>
              Wellcome Back!
            </Typography>
            <Typography variant="subtitle1">
              Please enter your details
            </Typography>
          </Stack>
          <FormProvider onSubmit={handleSubmit(handleLogin)} methods={methods}>
            <Stack gap={2} width="100%">
              <TextFieldCustom
                name="email"
                placeholder="Ex: abc@gmail.com"
                label="Email"
              />
              <TextFieldCustom
                name="password"
                placeholder="Enter your password"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CustomIconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        size="small"
                      >
                        {showPassword ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </CustomIconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="subtitle2">Forgot password?</Typography>
              <SubmitButton type="submit">Login</SubmitButton>
            </Stack>
          </FormProvider>
          <RegisterText
            alignItems="center"
            justifyContent="center"
            direction="row"
            gap={1}
          >
            You don't have an account ?
            <CustomLink onClick={handleSwitchPage}>Register</CustomLink>
          </RegisterText>
        </LoginWrapper>
      </LoginBox>
    </Stack>
  );
};

export const TextFieldCustom = styled(RHFTextField)`
  font-size: 16px;

  .MuiInputBase-input {
    font-size: 16px;
  }
`;

export const CustomLink = styled("p")`
  color: black;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const RegisterText = styled(Stack)`
  color: grey;
  font-size: 14px;
  margin-top: auto;
`;

export const SubmitButton = styled("button")`
  width: 100%;
  padding: 15px;
  background: black;
  border: none;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  transition: 0.3s;
  &:hover {
    background: #383838;
  }
`;

export const CustomIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
`;

export default Login;
