import React from "react";
import {useProducts} from "../../hooks/useProducts";
import {List, ListItem, styled} from "@mui/material";
import {Link, Text} from "../atoms";

const StyledListItem = styled(ListItem)(() => ({
  padding: "5px 0px 3px 15px",
  margin: "0px",
}));

export const ProductCategories = () => {
  const {productCategories} = useProducts();
  return (
    <List
      sx={{
        display: "flex",
      }}
    >
      {productCategories.map((category) => {
        const {_id, name} = category;
        return (
          <Link
            key={_id}
            to={`/products/categories/${name}?page=1&sort=price,asc`}
          >
            <StyledListItem>
              <Text color="#FF9900">{name}</Text>
            </StyledListItem>
          </Link>
        );
      })}
    </List>
  );
};
