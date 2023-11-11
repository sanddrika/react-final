import {Autocomplete, Box, TextField, styled} from "@mui/material";
import React from "react";
import {Link, Loading, Text} from "../atoms";
import {useState} from "react";
import {useEffect} from "react";
import {useDebounce, useFetchData} from "../../hooks";

const StyledImage = styled("img")(() => ({
  width: 50,
  height: 50,
  objectFit: "cover",
}));

export const SerchBar = () => {
  const [searchValue, setsearchValue] = useState("");
  const {getData, loading, data, setState} = useFetchData();
  const {products} = data || {};
  const debouncedSearchValue = useDebounce(500, searchValue);

  useEffect(() => {
    if (!debouncedSearchValue) {
      setState((prev) => ({...prev, data: null}));
    } else {
      getData(`/products/search?name=${debouncedSearchValue}`);
      console.log("sendRequest");
    }
  }, [debouncedSearchValue, getData, setState]);
  console.log("data", data);
  return (
    <Autocomplete
      freeSolo
      disableClearable
      loading={loading}
      loadingText={<Loading size={50} />}
      sx={{width: 300}}
      options={products || []}
      getOptionLabel={(option) => option.name}
      renderOption={(_, option) => {
        const {name, category, _id, price, image} = option;
        return (
          <Link to={`/products/categories/${category}/${_id}`} key={_id}>
            <Box sx={{display: "flex"}}>
              <StyledImage src={image} alt={`${name}-${category}`} />
              <Text>{name}</Text>
              <Text>{price}</Text>
            </Box>
          </Link>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
            label="Search products"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            sx={{
              input: {color: "#ff9900"},
            }}
            InputLabelProps={{
              style: {color: "#ff9900"},
            }}
          />
        );
      }}
    />
  );
};
