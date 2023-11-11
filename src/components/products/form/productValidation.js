import * as yup from "yup";
export const saveProductValidationSchema = yup.object({
  name: yup.string().required().min(3, "name should be minimum 3 character"),
  description: yup
    .string()
    .required()
    .min(3, "description should be minimum 3character"),
  brand: yup.string().required().min(3, "brand should be minimum 3 character"),
  category: yup
    .string()
    .required()
    .min(3, "category should be minimum 3 character"),
  price: yup.number().min(1, "price should be minimum 1").required(),
});
