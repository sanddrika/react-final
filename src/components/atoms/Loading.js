import {styled, Box, CircularProgress} from "@mui/material";
import React from "react";

const StyledLoadingContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));
export const Loading = ({size = 100, color = "primary"}) => {
  return (
    <StyledLoadingContainer>
      <CircularProgress size={size} color={color} />
    </StyledLoadingContainer>
  );
};
export const LoadingWrapper = ({children, isLoading}) => {
  if (isLoading) {
    return <Loading />;
  }
  return children;
};
