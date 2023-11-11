import * as yup from "yup";

export const loginFormValidationSchema = yup.object({
  email: yup.string().email("invalid email adress"),
  password: yup
    .string()
    .required()
    .min(3, "password should be at least 3 characters")
    .max(50, "password should be at most 50 characters"),
});
