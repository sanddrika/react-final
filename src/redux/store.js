import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {cartReducer, productReducer, userReducer} from "./slices";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistedStore = persistStore(store);
