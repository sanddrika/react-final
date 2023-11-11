import React from "react";
import {Alert, FormContainer} from "../atoms";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginFormValidationSchema} from "./loginFormVlaidation";
import {Input, Button} from "../atoms";
import {useDispatch} from "react-redux";
import {authenticateUser, formValues} from "../../redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAlert} from "../../hooks";
export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginFormValidationSchema),
    mode: "onChange",
  });
  const {t} = useTranslation();
  const {showAlert, alertState, handleClose} = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(authenticateUser({formValues: data, isLogin: true}))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        showAlert(error, "error");
      });
  };
  return (
    <FormContainer>
      <Controller
        sx={{marginTop: "100px"}}
        name="email"
        control={control}
        defaultValue=""
        render={({field}) => {
          const {name, onChange} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              lebel="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({field}) => {
          const {name, onChange} = field;

          return (
            <Input
              name={name}
              onChange={onChange}
              type="password"
              label={t("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          );
        }}
      />
      <Alert handleClose={handleClose} {...alertState} />
      <Button onClick={handleSubmit(onSubmit)}>{t("sign_in")}</Button>
    </FormContainer>
  );
};
