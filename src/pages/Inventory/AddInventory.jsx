import React, { useEffect, useReducer } from "react";
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

  // ✅ Validation Schema
  const schema = Yup.object().shape({
    state: Yup.string().required("State is required"),
    product: Yup.mixed().required("Product is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Must be positive"),
    // .integer("Must be a whole number"),
  });
  console.log(states);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      state: "",
      product: "",
      quantity: "",
    },
  });

  const onSubmit = (data) => {
    //     "productId": "string",
    // "quantity": 0,
    // "retailerId": "string",
    // "stateId": "string",
    // "status": "string"

    const payload = {
      productId: data.product,
      quantity: data.quantity,
      retailerId: "R-0001",
      stateId: data.state,
      status: "Pending",
    };
    post({
      apiUrl: apiEndPoints.postInventory(),
      apiDispatch: postinventoryDispatch,
      body: payload,
      callBackFunction: (res) => {
        if (res.success) {
          alert("updoaded");
          setOpen(false);
          getapi();
          // toast.success(res.message);
        } else {
          // toast.warn(res.message);
          alert("failed to uplaod");
          //
        }
      },
    });
  };

  useEffect(() => {
    get({
      apiUrl: apiEndPoints.getStatesList(),
      apiDispatch: statesDispatch,
    });
    get({
      apiUrl: apiEndPoints.getProductsList(),
      apiDispatch: productsDispatch,
    });
  }, []);

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <p
          className="text-center mb-auto 10px font-bold

"
        >
          Add Product to Inventory
        </p>
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
          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <CustomMultiSelect
                label="Product"
                items={products?.data?.data?.content || []}
                keyValuePair={["id", "productName"]}
                placeholder="Select Product"
                value={field.value}
                multiple={false}
                onChange={(e) => field.onChange(e.target.value)}
                errormsg={errors.product?.message}
                width={"200px"}
              />
            )}
          />

          {/* Quantity */}
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
              />
            )}
          />

          {/* Submit */}
          <div className="flex justify-center">
            <Button text="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventory;
