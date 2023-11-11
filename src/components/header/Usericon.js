import React, {useState} from "react";
import {Box, Menu, styled, IconButton, Avatar, MenuItem} from "@mui/material";
import {getUserInitials, isUserAdmin} from "../../helper";
import {useUser} from "../../hooks";
import {Button} from "../atoms";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/slices/userSlice";
import {clearCart} from "../../redux";
const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: 10,
}));
const UserIcon = () => {
  const {user} = useUser();
  const [anchor, setAnchor] = useState();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <Avatar>{getUserInitials(user)}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={() => {
          setAnchor(null);
        }}
      >
        <StyledBox>
          {!user && (
            <>
              <MenuItem>
                <Button onClick={() => navigate("/login")}>
                  {t("sign_in")}
                </Button>
                <Button onClick={() => navigate("/register")}>sign up</Button>
              </MenuItem>
            </>
          )}
          {user && (
            <MenuItem>
              <Button
                onClick={() => {
                  dispatch(logout());
                  dispatch(clearCart());
                  localStorage.setItem("cartItems", JSON.stringify([]));
                }}
              >
                logout
              </Button>
            </MenuItem>
          )}
          {isUserAdmin(user) && (
            <MenuItem>
              <Button onClick={() => navigate("/products/new")}>
                add product
              </Button>
            </MenuItem>
          )}
        </StyledBox>
      </Menu>
    </Box>
  );
};

export default UserIcon;
