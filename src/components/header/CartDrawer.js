import React from "react";
import {useDispatch} from "react-redux";
import {useCart, useUser} from "../../hooks";
import {Drawer, styled, Box} from "@mui/material";
import {Button, LoadingWrapper, Text} from "../atoms";
import {clearCart} from "../../redux";
import {saveCart} from "../../redux";
const StyledCartItem = styled(Box)(() => ({
  width: 400,
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  marginBottom: 20,
}));

const StyledImage = styled("img")(() => ({
  width: 70,
  height: 70,
  objectFit: "cover",
  borderRadius: 5,
}));
const StyledButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));
export const CartDrawer = ({isCartOpen, setisCartOpen, cartItems}) => {
  const {loading} = useCart();
  const dispatch = useDispatch();
  const {user} = useUser();

  return (
    <Drawer
      open={isCartOpen}
      onClose={() => {
        setisCartOpen(false);
      }}
      anchor="right"
    >
      <LoadingWrapper isLoading={loading}>
        {cartItems.map((cartItems) => {
          const {product, quantity} = cartItems;
          const {price, name, _id, image} = product;
          return (
            <StyledCartItem key={_id}>
              <StyledImage src={image} alt={`${name}-img`} />
              <Box sx={{paddingLeft: 5}}>
                <Text>{name}</Text>

                <Text>quantity:{quantity}</Text>
                <Text>total:${price * quantity}</Text>
              </Box>
            </StyledCartItem>
          );
        })}
        <StyledButtonContainer>
          <Button
            onClick={() => {
              dispatch(clearCart());
              setisCartOpen(false);
            }}
          >
            clear cart
          </Button>
          {!!user && (
            <Button
              onClick={() => {
                dispatch(saveCart({userId: user._id, cartItems}));
              }}
            >
              save cart
            </Button>
          )}
        </StyledButtonContainer>
      </LoadingWrapper>
    </Drawer>
  );
};
