import {Typography} from "@mui/material";
import React from "react";

export const Text = ({children, variant = "body1", ...rest}) => {
  return (
    <Typography variant={variant} {...rest}>
      {children}
    </Typography>
  );
};
