import React from "react";
import {useSelector} from "react-redux";

export const useCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const loading = useSelector((state) => state.cart.loading);
  return {
    cartItems,
    loading,
  };
};
