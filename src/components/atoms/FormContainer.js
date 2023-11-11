import React from "react";
import {FormControl, styled} from "@mui/material";

export const StyledFormContainer = styled(FormControl)(() => ({
  marginTop: "150px",
  display: "flex",
  alignItems: "center",
}));

export const FormContainer = ({children}) => {
  return <StyledFormContainer>{children}</StyledFormContainer>;
};
