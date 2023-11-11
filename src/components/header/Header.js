import {AppBar, Toolbar, styled, Box, Badge} from "@mui/material";
import React from "react";
import {Button, LanguageSelect, Link} from "../atoms";
import {SerchBar} from "./SerchBar";
import UserIcon from "./Usericon";
import {CartDrawer} from "./CartDrawer";
import {useState} from "react";
import {BsCart4} from "react-icons/bs";
import {useCart} from "../../hooks";
import {ProductCategories} from "./ProductCategories";
const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#131921",
  padding: "0 37 0 30px",
}));
const StyledToolBar = styled(Toolbar)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  paddingTop: 8,
  paddingBottom: 5,
}));

export const Header = () => {
  const [isCartOpen, setisCartOpen] = useState(false);
  const {cartItems} = useCart();
  return (
    <Box>
      <StyledAppBar>
        <StyledToolBar>
          <Link to="/" style={{color: "white"}}>
            home
          </Link>
          <SerchBar />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "spaceBetween",
            }}
          >
            <Button onClick={() => setisCartOpen(true)}>
              <Badge badgeContent={cartItems.length} color="primary">
                <BsCart4 size={30} color="#bf4f17" />
              </Badge>
            </Button>
            <UserIcon />
            <LanguageSelect />
          </Box>
        </StyledToolBar>
        <ProductCategories />
      </StyledAppBar>

      <CartDrawer
        isCartOpen={isCartOpen}
        setisCartOpen={setisCartOpen}
        cartItems={cartItems}
      />
    </Box>
  );
};
