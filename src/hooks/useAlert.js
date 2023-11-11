import React from "react";
import {useState} from "react";

export const useAlert = () => {
  const [alertState, setalertState] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const showAlert = (message, severity) => {
    setalertState((prev) => ({
      ...prev,
      open: true,
      message,
      severity,
    }));
  };
  const handleClose = () => {
    setalertState((prev) => ({
      ...prev,
      open: false,
      message: "",
      severity: "error",
    }));
  };
  return {
    alertState,
    showAlert,
    handleClose,
  };
};
