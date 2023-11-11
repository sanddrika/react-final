import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../helper";

export const saveCart = createAsyncThunk(
  "cart/saveCart",
  async ({userId, cartItems}, {rejectWithValue, dispatch}) => {
    try {
      await axiosInstance.put(`/users/${userId}/cart`, {
        products: cartItems,
      });
      dispatch(fetchCart(userId));
    } catch (error) {
      return rejectWithValue("could not saved cart");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`/users/${userId}/cart`);
      localStorage.setItem("cartItems", JSON.stringify(data.cart));
      return data;
    } catch (error) {
      return rejectWithValue("could not fetch cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCart: (state, action) => {
      const productId = action.payload?._id;

      const productInCart = state.cartItems.find(
        (item) => item.product?._id === productId
      );
      if (productInCart) {
        const updatedCart = state.cartItems.map((cartElement) => {
          return cartElement.product?._id === productId
            ? {
                ...cartElement,
                quantity: cartElement.quantity + 1,
              }
            : {...cartElement};
        });
        state.cartItems = updatedCart;
      } else {
        state.cartItems.push({product: action.payload, quantity: 1});
      }

      // es isaa rac mere davamatet

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      // es isaa rac mere davamatet
    },
    deleteFromCart: (state, action) => {
      const productId = action.payload;
      const productInCart = state.cartItems.find(
        (item) => item.product?._id === productId
      );
      if (productInCart.quantity > 1) {
        const updatedCart = state.cartItems.map((cartElement) => {
          return cartElement.product?._id === productId
            ? {...cartElement, quantity: cartElement.quantity - 1}
            : {...cartElement};
        });
        state.cartItems = updatedCart;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.product?._id !== productId
        );
      }
      // es isaa rac mere davamatet
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // es isaa rac mere davamatet
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveCart.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cart;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const {addToCart, deleteFromCart, clearCart} = cartSlice.actions;
