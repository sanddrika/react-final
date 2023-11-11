import React, {useEffect} from "react";
import {RoutesComponent} from "./Routes";
import {LanguageSelect} from "./components/atoms";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {isUserAdmin} from "./helper";
import {fetchCart, fetchHomePageProducts} from "./redux";
import {Link} from "react-router-dom";
import {Grid} from "@mui/material";
import {Header} from "./components/header";
import {useUser} from "./hooks";

function App() {
  const {t} = useTranslation();
  // const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const {user} = useUser();

  useEffect(() => {
    if (user?._id) dispatch(fetchCart(user?._id));
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchHomePageProducts());
  }, [dispatch]);
  return (
    <div>
      <Grid sx={{minHeight: "100vh"}}>
        <Grid item>
          <Header />
        </Grid>
        <Grid
          item
          sx={{
            paddingTop: "20",
            minHeight: "100vh",
            width: "100%",
            pb: 10,
            backgroundColor: "#f5f5f5",
          }}
        >
          <RoutesComponent />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
