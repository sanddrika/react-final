import React from "react";
import {useSelector} from "react-redux";

export const useUser = () => {
  const user = useSelector((state) => state.user.userData);
  return {user};
};
