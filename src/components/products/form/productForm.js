import React, {useEffect, useState} from "react";
import {Button, FormContainer, Input} from "../../atoms";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {saveProductValidationSchema} from "./productValidation";
import FileBase64 from "react-file-base64";
import {useDispatch} from "react-redux";
import {
  saveProduct,
  setSelectedProduct,
} from "../../../redux/slices/productSlice";
import {useNavigate} from "react-router-dom";
import {useProducts} from "../../../hooks/useProducts";

export const ProductForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(saveProductValidationSchema),
    mode: "onChange",
  });

  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedProduct} = useProducts();

  useEffect(() => {
    if (selectedProduct) {
      setImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, []);

  const onSave = (data) => {
    console.log({...data, image});
    dispatch(
      saveProduct({product: {...data, image}, productId: selectedProduct?._id})
    )
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormContainer>
      <Controller
        name="name"
        defaultValue={selectedProduct?.name}
        control={control}
        render={({field}) => {
          const {name, onChange, value} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              value={value}
              helperText={errors?.name?.message}
              error={!!errors.name}
              label="Product name"
            />
          );
        }}
      />
      <Controller
        name="description"
        defaultValue={selectedProduct?.description}
        control={control}
        render={({field}) => {
          const {name, onChange, value} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              value={value}
              helperText={errors?.description?.message}
              error={!!errors.description}
              label="Product description"
            />
          );
        }}
      />
      <Controller
        name="brand"
        defaultValue={selectedProduct?.brand}
        control={control}
        render={({field}) => {
          const {name, onChange, value} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              value={value}
              helperText={errors?.brand?.message}
              error={!!errors.brand}
              label="Product brand"
            />
          );
        }}
      />
      <Controller
        name="category"
        defaultValue={selectedProduct?.category}
        control={control}
        render={({field}) => {
          const {name, onChange, value} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              value={value}
              helperText={errors?.category?.message}
              error={!!errors.category}
              label="Product category"
            />
          );
        }}
      />
      <Controller
        name="price"
        defaultValue={selectedProduct?.price}
        control={control}
        render={({field}) => {
          const {name, onChange, value} = field;
          return (
            <Input
              name={name}
              onChange={onChange}
              type="number"
              value={value}
              helperText={errors?.price?.message}
              error={!!errors.price}
              label="Product price"
            />
          );
        }}
      />
      <FileBase64
        type="file"
        multiple={false}
        onDone={({base64}) => {
          setImage(base64);
        }}
      />
      <Button onClick={handleSubmit(onSave)}>save product</Button>
    </FormContainer>
  );
};
