import React, {useEffect} from "react";
import {LoadingWrapper} from "../../atoms";
import {useProducts} from "../../../hooks/useProducts";
import {Box, styled} from "@mui/material";
import {GridContainer, ProductCard} from "../shared";
import {Sort} from "./Sort";
import {Paginate} from "./Paginate";
import {useDispatch} from "react-redux";
import {fetchCategoryProducts} from "../../../redux";
import {useParams} from "react-router-dom";
import {useQueryParams} from "../../../hooks";

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  marginTop: "100px",
}));

export const CategoryProductList = () => {
  const {isLoading, categoryProducts, totalPages} = useProducts();
  const dispatch = useDispatch();
  const {categoryName} = useParams();
  const {value: page, changeQueryValue: changePage} = useQueryParams("page");
  const {value: sort, changeQueryValue: changeSort} = useQueryParams("sort");

  categoryProducts.map((product) => console.log(product));

  useEffect(() => {
    dispatch(
      fetchCategoryProducts({
        categoryName,
        queryUrl: `?size=1&sort=${sort}&page=${page}`,
      })
    );
  }, [categoryName, dispatch, page, sort]);

  useEffect(() => {
    changePage("page", 1);
  }, [sort]);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Container>
        <Sort value={sort} changeSort={changeSort} />
        <GridContainer>
          {categoryProducts.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </GridContainer>
        <Paginate
          totalPages={totalPages}
          currentPage={page}
          changePage={changePage}
        />
      </Container>
    </LoadingWrapper>
  );
};
