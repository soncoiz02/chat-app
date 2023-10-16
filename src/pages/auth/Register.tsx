import { Grid, InputAdornment, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { RegisterDataType, RegisterFormType } from "../../types/auth";
import {
  disappear,
  fadeIn,
  leftOut,
  leftOutReverse,
  rightOut,
  rightOutReverse,
} from "../../utils/keyframs";

import RegisterImage from "../../assets/register.png";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormProvider from "../../components/RHF/FormProvider";
import {
  CustomIconButton,
  CustomLink,
  RegisterText,
  SubmitButton,
  TextFieldCustom,
} from "./Login";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosError } from "axios";
import { register } from "../../services/auth";
import useAuth from "../../hooks/useAuth";
import { useAppDispatch } from "../../redux/hook";
import { saveUserInfo } from "../../redux/features/user/userSlice";
import { IsNavigateProp } from "../../types/styledComponents";

// styled components

const LoginWrapper = styled(Stack)<IsNavigateProp>(
  ({ isNavigate }) => css`
    opacity: 0;
    animation: ${isNavigate ? disappear : fadeIn} 1s forwards;
    animation-delay: ${isNavigate ? "0" : "1s"};
  `
);

const ImgWrapper = styled(Stack)<IsNavigateProp>(
  ({ isNavigate }) => css`
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    opacity: 0;
    height: 100%;
    img {
      width: 90%;
    }

    animation: ${isNavigate ? leftOutReverse : leftOut} 1.5s ease-out forwards;
    animation-delay: ${isNavigate ? "0" : "1s"};
  `
);

const LoginBox = styled(Stack)<IsNavigateProp>(
  ({ isNavigate }) => css`
    height: 100%;
    box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
      0px 12px 24px -4px rgba(145, 158, 171, 0.12);
    background: white;
    animation: ${isNavigate ? rightOutReverse : rightOut} 1s ease-out forwards;
    z-index: 2;
    padding: 30px 80px;
  `
);

// --------------------------------------------------------------------------

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isNavigate, setIsNavigate] = useState<boolean>(false);

  const navigate = useNavigate();

  // useAuth

  const { saveToken } = useAuth();

  // redux dispatch

  const dispatch = useAppDispatch();

  // yup

  const registerSchema = yup.object().shape({
    firstname: yup
      .string()
      .trim()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40)
      .required("First name is required"),
    lastname: yup
      .string()
      .trim()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40)
      .required("Last name is required"),
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
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], "Password does not match")
      .required("Confirm password is required"),
  });

  // handle form

  const methods = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, setError } = methods;

  const onSubmit: SubmitHandler<RegisterFormType> = (values) => {
    const { firstname, lastname, email, password } = values;
    const registerData = {
      displayName: `${firstname} ${lastname}`,
      email,
      password,
    };

    handleRegister(registerData);
  };

  const handleRegister = async (registerData: RegisterDataType) => {
    try {
      const response = await register(registerData);
      const { accessToken, userInfo } = response;
      saveToken(accessToken);
      dispatch(saveUserInfo(userInfo));
      handleSwitchPage("/");
    } catch (error) {
      const err = error as AxiosError;
      const errData = err.response?.data;
      if (errData) {
        return setError(errData?.field, { message: errData?.message });
      }

      alert("Login fail!");
    }
  };

  // handle show password

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // handle switch page

  const handleSwitchPage = (path: string) => {
    setIsNavigate(true);
    setTimeout(() => {
      navigate(path);
    }, 1500);
  };

  return (
    <Stack
      direction="row"
      width="100%"
      height="100%"
      justifyContent="flex-start"
    >
      <LoginBox
        justifyContent="center"
        alignItems="center"
        isNavigate={isNavigate}
      >
        <LoginWrapper
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          isNavigate={isNavigate}
        >
          <Stack
            width="100%"
            justifyContent="center"
            alignItems="center"
            mb={5}
            mt={8}
          >
            <Typography variant="h3" fontWeight={800}>
              Join With Us!
            </Typography>
            <Typography variant="subtitle1">
              Please enter your details
            </Typography>
          </Stack>
          <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextFieldCustom
                  name="firstname"
                  placeholder="Enter your first name"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldCustom
                  name="lastname"
                  placeholder="Enter your last name"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldCustom
                  name="email"
                  placeholder="Ex: abc@gmail.com"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <TextFieldCustom
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  label="Confirm Password"
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
              </Grid>
              <Grid item xs={12}>
                <SubmitButton type="submit">Register</SubmitButton>
              </Grid>
            </Grid>
          </FormProvider>
          <RegisterText
            alignItems="center"
            justifyContent="center"
            direction="row"
            gap={1}
          >
            You already have an account ?
            <CustomLink onClick={() => handleSwitchPage("/auth/login")}>
              Login
            </CustomLink>
          </RegisterText>
        </LoginWrapper>
      </LoginBox>
      <ImgWrapper
        alignItems="center"
        justifyContent="center"
        isNavigate={isNavigate}
      >
        <img src={RegisterImage} alt="Register Image" />
      </ImgWrapper>
    </Stack>
  );
};

export default Register;
