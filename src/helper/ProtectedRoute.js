import React from "react";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({children, hasAcces}) => {
  if (hasAcces) {
    return children;
  }
  return <Navigate to="/" />;
};
