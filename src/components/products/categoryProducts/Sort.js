import {MenuItem, Select} from "@mui/material";
import React from "react";

export const Sort = ({value, changeSort}) => {
  return (
    <Select
      value={value ?? "price,asc"}
      onChange={(e) => {
        changeSort("sort", e.target.value);
      }}
    >
      <MenuItem value="price,desc">price decreasing</MenuItem>
      <MenuItem value="price,asc">price increasing</MenuItem>
      <MenuItem value="name,desc">pname decreasing</MenuItem>
      <MenuItem value="name,asc">name increasing</MenuItem>
    </Select>
  );
};
