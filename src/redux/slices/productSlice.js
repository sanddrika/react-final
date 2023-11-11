import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../helper";

export const saveProduct = createAsyncThunk(
  "product/saveProduct",

  async ({product, productId}, {rejectWithVlaue, dispatch}) => {
    try {
      const method = productId ? "put" : "post";
      const endpoint = productId ? `/products/${productId}` : "/products";
      const {data} = await axiosInstance[method](endpoint, {
        product,
      });

      dispatch(fetchHomePageProducts());

      return data;
    } catch (error) {
      return rejectWithVlaue("error saving product");
    }
  }
);

export const fetchHomePageProducts = createAsyncThunk(
  "products/fetchHomePageProducts",
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get("/products");
      return data;
    } catch (error) {
      return rejectWithValue("error fetching homepage products");
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, {dispatch, rejectWithValue}) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      dispatch(fetchHomePageProducts());
    } catch (error) {
      return rejectWithValue("error deleting product");
    }
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "product/fetchCategoryProducts",
  async ({categoryName, queryUrl}, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        `/products/categories/${categoryName}${queryUrl}`
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue("error fetching category products");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    homePageProducts: [],
    data: [],
    error: null,
    selectedProduct: null,
    productCategories: [],
    categoryProducts: [],
    totalPages: 0,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(saveProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchHomePageProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHomePageProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageProducts = action.payload.products;
      state.productCategories = action.payload.categories;
    });
    builder.addCase(fetchHomePageProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCategoryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryProducts = action.payload.products;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchCategoryProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
export const {setSelectedProduct} = productSlice.actions;
