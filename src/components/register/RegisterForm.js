import React from "react";
import {FormContainer, Input, Button} from "../atoms";
import {Controller, useForm, control} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerValidationSchema} from "./RegisterFormValidation";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authenticateUser, formValues} from "../../redux";
// import {formValues} from "../../redux";
import {useTranslation} from "react-i18next";

export const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: "onChange",
  });
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(authenticateUser({formValues: data}))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormContainer>
      <Controller
        control={control}
        name="firstName"
        defaultValue=""
        render={({field}) => {
          const {name, onChange} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              label={t("first_name")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="lastName"
        defaultValue=""
        render={({field}) => {
          const {name, onChange} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              label={t("last_name")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({field}) => {
          const {name, onChange} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              label={t("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({field}) => {
          const {name, onChange} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              label={t("password")}
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          );
        }}
      />
      <Button onClick={handleSubmit(onSubmit)}>{t("register")}</Button>
    </FormContainer>
  );
};
