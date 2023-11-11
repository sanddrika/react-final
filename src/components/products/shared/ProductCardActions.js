import React from "react";
import {isUserAdmin} from "../../../helper";
import {Box} from "@mui/material";
import {Text} from "../../atoms";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
  deleteProduct,
  deleteFromCart,
  setSelectedProduct,
} from "../../../redux";

import {addToCart} from "../../../redux";
import {useCart} from "../../../hooks";

export const ProductCardActions = ({user, product}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartItems} = useCart();

  if (isUserAdmin(user)) {
    return (
      <Box>
        <Button
          onClick={() => {
            navigate(`/products/edit/${product._id}`);
            dispatch(setSelectedProduct(product));
          }}
        >
          edit
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteProduct(product._id));
          }}
        >
          delete
        </Button>
      </Box>
    );
  }

  const isProductInCart = cartItems.find(
    (item) => item.product?._id === product._id
  );

  return (
    <Box>
      {!isProductInCart ? (
        <Button onClick={() => dispatch(addToCart(product))}>
          add to cart
        </Button>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onClick={() => dispatch(deleteFromCart(product._id))}>
            -
          </Button>
          <Text>{isProductInCart.quantity}</Text>
          <Button onClick={() => dispatch(addToCart(product))}>+</Button>
        </Box>
      )}
    </Box>
  );
};
