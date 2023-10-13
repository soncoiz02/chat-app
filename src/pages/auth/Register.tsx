import { Grid, InputAdornment, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RegisterFormType } from "../../types/auth";
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

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isNavigate, setIsNavigate] = useState<boolean>(false);

  const navigate = useNavigate();

  // styled components

  const ImgWrapper = styled(Stack)`
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
  `;

  const LoginBox = styled(Stack)`
    height: 100%;
    box-shadow: 0px 0px 2px 0px rgba(145, 158, 171, 0.2),
      0px 12px 24px -4px rgba(145, 158, 171, 0.12);
    background: white;
    animation: ${isNavigate ? rightOutReverse : rightOut} 1s ease-out forwards;
    z-index: 2;
    padding: 30px 80px;
  `;

  const LoginWrapper = styled(Stack)`
    opacity: 0;
    animation: ${isNavigate ? disappear : fadeIn} 1s forwards;
    animation-delay: ${isNavigate ? "0" : "1s"};
  `;

  // yup

  const registerSchema = yup.object().shape({
    firstname: yup.string().trim().required("First name is required"),
    lastname: yup.string().trim().required("Last name is required"),
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

  const { handleSubmit } = methods;

  const handleLogin: SubmitHandler<RegisterFormType> = (values) => {
    console.log(values);
  };

  // handle show password

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // handle switch page

  const handleSwitchPage = () => {
    setIsNavigate(true);
    setTimeout(() => {
      navigate("/auth/login");
    }, 1500);
  };

  return (
    <Stack
      direction="row"
      width="100%"
      height="100%"
      justifyContent="flex-start"
    >
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
          <FormProvider onSubmit={handleSubmit(handleLogin)} methods={methods}>
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
            <CustomLink onClick={handleSwitchPage}>Login</CustomLink>
          </RegisterText>
        </LoginWrapper>
      </LoginBox>
      <ImgWrapper alignItems="center" justifyContent="center">
        <img src={RegisterImage} alt="Register Image" />
      </ImgWrapper>
    </Stack>
  );
};

export default Register;
