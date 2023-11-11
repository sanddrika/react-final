import React from "react";
import {useParams} from "react-router-dom";
import {useFetchData, useUser} from "../../../hooks";
import {useEffect} from "react";
import {LoadingWrapper} from "../../atoms";
import {Box, styled} from "@mui/material";
import {Text} from "../../atoms";
import {ProductCardActions} from "../shared/ProductCardActions";

const Container = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  marginTop: "150px",
}));
const StyledImage = styled("img")(() => ({
  width: "350px",
  height: "350px",
  objectFit: "cover",
}));
const Description = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
}));

export const SingleProduct = () => {
  const {id, categoryName} = useParams();
  const {getData, data, loading, error} = useFetchData();
  const {user} = useUser();

  useEffect(() => {
    getData(`/products/category/${categoryName}/${id}`);
  }, [id, categoryName, getData]);

  const {image, name, brand, description} = data?.product || {};

  return (
    <LoadingWrapper isLoading={loading}>
      <Container>
        <StyledImage src={image} alt={`${name}-${brand}`} />
        <Box>
          <Description>
            <Text variant="h4">product name</Text>
            <Text variant="h4">{name}</Text>
          </Description>
          <Description>
            <Text variant="h4">product brand</Text>
            <Text variant="h4">{brand}</Text>
          </Description>
          <Description>
            <Text variant="h4">product description</Text>
            <Text variant="h4">{description}</Text>
          </Description>
          <ProductCardActions user={user} product={data?.product} />
        </Box>
      </Container>
    </LoadingWrapper>
  );
};
