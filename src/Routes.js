import React from "react";
import {Routes, Route} from "react-router-dom";
import {
  CategoryProductsPage,
  HomePage,
  LoginPage,
  RegisterPage,
  SingleProductPage,
} from "./pages";
import {ProductFormPage} from "./pages/ProductFormPage";
import {ProtectedRoute, isUserAdmin} from "./helper";
import {useUser} from "./hooks";

export const RoutesComponent = () => {
  const {user} = useUser();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/products/new"
        element={
          <ProtectedRoute hasAcces={isUserAdmin(user)}>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute hasAcces={isUserAdmin(user)}>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/categories/:categoryName"
        element={<CategoryProductsPage />}
      />
      <Route
        path="/products/categories/:categoryName/:id"
        element={<SingleProductPage />}
      />
    </Routes>
  );
};
