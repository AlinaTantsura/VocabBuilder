/* eslint-disable react/prop-types */
import * as yup from "yup";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useForm } from "react-hook-form";
import {
  IconEye,
  InputsBox,
  InputStyled,
  FormStyled,
  PassInputBox,
  FormTitle,
  FormDescription,
  ErrorMessage,
} from "./LoginModal.styled";
import Button from "../Button/Button";
import sprite from "../images/sprite.svg";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch} from "react-redux";
import { logInUser } from "../../redux-toolkit/user/operations";
import "react-toastify/dist/ReactToastify.css";

const LoginFormValidateSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Email is not valid"),
  password: yup.string().required("Password is required").min(6),
});

const LoginModal = ({ open, onClose }) => {
  const [isShownPass, setIsShownPass] = useState(false);
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginFormValidateSchema) });

  const handleShowPass = () => {
    if (isShownPass) return setIsShownPass(false);
    setIsShownPass(true);
  };
  const handleSubmitLogin = (data) => {
    dispatch(logInUser(data));
    reset();
    onClose(true);
    
  };

  if (open) {
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";

    }
  else {
    document.body.style.height = "100%";
    document.body.style.overflowY = "auto";
    }

  return (
    <ModalWindow open={open} onClose={onClose}>
      <FormStyled onSubmit={handleSubmit(handleSubmitLogin)}>
        <FormTitle>Log In</FormTitle>
        <FormDescription>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </FormDescription>

        <InputsBox>
          <InputStyled
            type="email"
            {...register("email")}
            placeholder="Email"
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
          <PassInputBox>
            <InputStyled
              type={isShownPass ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
            />
            <IconEye onClick={handleShowPass} width="20" height="20">
              <use
                href={
                  isShownPass ? sprite + "#icon-eye" : sprite + "#icon-eye-off"
                }
              />
            </IconEye>
          </PassInputBox>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </InputsBox>
        <Button>Log In</Button>
      </FormStyled>
    </ModalWindow>
  );
};

export default LoginModal;
