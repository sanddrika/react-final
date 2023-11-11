import React from "react";
import {Link as RouterLink} from "react-router-dom";

export const Link = ({children, to, style, ...rest}) => {
  return (
    <RouterLink
      to={to}
      style={{textDecoration: "none", color: "black", ...style}}
      {...rest}
    >
      {children}
    </RouterLink>
  );
};
