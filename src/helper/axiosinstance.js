import axios from "axios";
import {chechkTokenValidity} from "./utils";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_BASE_URL
    : process.env.REACT_APP_PROD_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (!token || !refreshToken) return req;

  req.headers.Authorization = `Bearer ${token}`;
  const isExpired = chechkTokenValidity(token);
  if (!isExpired) return req;
  const {data} = await axios.post(`${APgitL}/users/refresh`, {
    refresh_token: refreshToken,
  });
  const {token: newAccessToken} = data;
  localStorage.setItem("token", newAccessToken);
  req.headers.Authorization = `bearer ${newAccessToken}`;
  return req;
});  