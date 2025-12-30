import React, { useEffect, useReducer, useState } from "react";
import Header from "../../layouts/Header";
import {
  CustomFormInput,
  CustomMultiSelect,
} from "../../components/Inputs/Inputs";
import { Button } from "../../components/Buttons/Buttons";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { apiReducer, initialState } from "../../services/apiReducer";
import useApiServices from "../../services/apiServices";
import apiEndPoints from "../../services/apiEndPoints";
import { toast } from "react-toastify";

const AddInventory = ({ setOpen, getapi }) => {
  const { get, post } = useApiServices();
  const [states, statesDispatch] = useReducer(apiReducer, initialState);
  const [products, productsDispatch] = useReducer(apiReducer, initialState);
  const [postinventoryState, postinventoryDispatch] = useReducer(
    apiReducer,
    initialState
  );
  const [selectedStateId, setSelectedStateId] = useState("");
  const [productMap, setProductMap] = useState({}); // Map productId to productCode
  const [hasProducts, setHasProducts] = useState(true); // Track if products exist

  // ✅ Validation Schema
  const schema = Yup.object().shape({
    state: Yup.string().required("State is required"),
    product: Yup.string().required("Product is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Must be positive"),
    // .integer("Must be a whole number"),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      state: "",
      product: "",
      quantity: "",
    },
  });

  const watchedState = watch("state");
  const watchedProduct = watch("product");

  const onSubmit = (data) => {
    const payload = {
      productId: data.product,
      quantity: data.quantity,
      retailerId: "R-0001",
      stateId: data.state,
      status: "PENDING",
    };

    post({
      apiUrl: apiEndPoints.postInventory(),
      apiDispatch: postinventoryDispatch,
      body: payload,
      callBackFunction: (res) => {
        if (res.success) {
          setOpen(false);
          getapi();
          toast.success(res.message);
        } else {
          toast.warn(res.message);
        }
      },
    });
  };

  // Fetch states on initial load
  useEffect(() => {
    get({
      apiUrl: apiEndPoints.getStatesList(),
      apiDispatch: statesDispatch,
    });
  }, []);

  // Fetch products when state is selected
  useEffect(() => {
    if (watchedState) {
      setSelectedStateId(watchedState);
      // Clear previous product selection
      setValue("product", "");

      // Reset hasProducts to true while loading
      setHasProducts(true);

      get({
        apiUrl: apiEndPoints.getstateProductsList({ stateId: watchedState }),
        apiDispatch: productsDispatch,
      });
    }
  }, [watchedState, setValue, get]);

  // Check if products exist when products data changes
  useEffect(() => {
    if (products?.data?.data?.content) {
      const productList = products.data.data.content;
      setHasProducts(productList.length > 0);

      // Create product map
      const newProductMap = {};
      productList.forEach((product) => {
        newProductMap[product.productId] = product.stateProductCode;
      });
      setProductMap(newProductMap);
    } else if (products.data && !products.loading && !products.error) {
      // API call completed but no products
      setHasProducts(false);
    }
  }, [
    products?.data?.data?.content,
    products.data,
    products.loading,
    products.error,
  ]);

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <p className="text-center mb-auto 10px font-bold">Add User Inventory</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow p-4 space-y-4"
        >
          {/* State Select */}
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <CustomMultiSelect
                label="State"
                items={states?.data?.data || []}
                keyValuePair={["id", "name"]}
                placeholder="Select State"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                errormsg={errors.state?.message}
                multiple={false}
                width={"200px"}
              />
            )}
          />

          {/* Product Select */}
          {watchedState && !hasProducts && (
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-700 font-medium">
                No products available for the selected state
              </p>
              <p className="text-yellow-600 text-sm mt-1">
                Please select a different state
              </p>
            </div>
          )}

          {watchedState && hasProducts && (
            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <CustomMultiSelect
                  label="Product"
                  items={products?.data?.data?.content || []}
                  keyValuePair={["stateProductCode", "stateProductCode"]}
                  placeholder="Select Product"
                  value={field.value}
                  multiple={false}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  errormsg={errors.product?.message}
                  width="200px"
                  maxWidth="200px"
                  disabled={!watchedState}
                />
              )}
            />
          )}

          {/* Show product select placeholder when no state selected */}
          {!watchedState && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product
              </label>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-500 text-sm">
                Please select a state first
              </div>
            </div>
          )}

          {/* Quantity - only show if product is selected */}

          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <CustomFormInput
                label="Quantity"
                type="number"
                {...field}
                errormsg={errors.quantity?.message}
                className={"!w-auto"}
                direction={"col"}
                disabled={!hasProducts || !watchedProduct}
              />
            )}
          />

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              text="Submit"
              type="submit"
              disabled={!watchedState || !watchedProduct || !hasProducts}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventory;
