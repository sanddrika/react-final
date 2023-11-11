import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../helper";

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async ({formValues, isLogin}, {rejectWithValue}) => {
    try {
      const endpoint = `/users/${isLogin ? "login" : "register"} `;
      // const endpoint = "/users/register";
      const {data} = await axiosInstance.post(endpoint, formValues);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {loading: true, error: null, userData: null},

  reducers: {
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload.user;
      state.error = null;
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
export const {logout} = userSlice.actions;
