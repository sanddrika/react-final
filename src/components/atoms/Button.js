import React from "react";
import {Button as MUIButton} from "@mui/material";
export const Button = ({children, onClick, ...rest}) => {
  return (
    <MUIButton onClick={onClick} {...rest}>
      {children}
    </MUIButton>
  );
};
