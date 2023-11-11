import * as yup from "yup";

export const registerValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("first name is required")
    .min(3, "first name characters should be minimum 3")
    .max(50, "first name characters should be maximum 50"),
  lastName: yup
    .string()
    .required("last name is required")
    .min(3, "first name characters should be minimum 3")
    .max(50, "first name characters should be maximum 50"),
  email: yup.string().email("invalid email adress"),
  password: yup
    .string()
    .required("password is required")
    .min(3, "password should be min 3 characters ")
    .max(50, "password should be max 50 characters "),
});
