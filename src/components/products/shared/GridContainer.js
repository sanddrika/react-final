import React from "react";
import {Grid} from "@mui/material";

export const GridContainer = ({children}) => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        justifyContent: "center",
        "& > .MuiGrid-item": {
          paddingRight: 0,
        },

        marginTop: 15,
      }}
      rowGap={2}
      columnGap={3}
    >
      {children}
    </Grid>
  );
};
