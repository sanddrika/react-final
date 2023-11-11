import React from "react";
import {useProducts} from "../../../hooks";
import {LoadingWrapper} from "../../atoms";
import {GridContainer} from "../shared/GridContainer";
import {ProductCard} from "../shared";

export const HomePageProducts = () => {
  const {homePageProducts, isLoading} = useProducts();
  return (
    <LoadingWrapper isLoading={isLoading}>
      <GridContainer>
        {homePageProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </GridContainer>
    </LoadingWrapper>
  );
};
