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

const AddRetailerOrder = ({ setOpen, getapi }) => {
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

    product: Yup.array()
      .min(1, "At least one product is required")
      .required("Product is required"),

    amount: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      state: "",
      product: [], // 👈 multi select needs array
      amount: "",
    },
  });

  // ✅ Submit Handler

  const onSubmit = (data) => {
    // {
    //   "retailerId": "string",
    //   "stateId": "string",
    //   "orderItemsRequestList": [
    //     {
    //       "productId": "string",
    //       "quantity": 0
    //     }
    //   ]
    // }

    const payload = {
      orderItemsRequestList: data.product.map((productId) => ({
        productId: productId,
        // productName: productName,
        quantity: 1,
      })),
      totalAmount: data.amount,
      retailerId: "R-0001",
      stateId: data.state,
    };
    // console.log(payload);

    post({
      apiUrl: apiEndPoints.postRetailerOrder(),
      apiDispatch: postinventoryDispatch,
      body: payload,
      callBackFunction: (res) => {
        if (res.success) {
          toast.success("Order created successfully");
          setOpen(false);
          getapi();
        } else {
          toast.error(res.message || "Failed to create order");
        }
      },
    });
  };

  // ✅ Fetch States & Products
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
        <p className="text-center font-bold mb-4">Add Retailer Order</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow p-4 space-y-4"
        >
          {/* ✅ State Select */}
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
                width="200px"
              />
            )}
          />

          {/* ✅ Product Multi Select */}
          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <CustomMultiSelect
                label="Product"
                items={products?.data?.data?.content || []}
                keyValuePair={["id", "productName"]}
                placeholder="Select Products"
                value={field.value}
                multiple={true}
                onChange={(e) => field.onChange(e.target.value)}
                errormsg={errors.product?.message}
                width="200px"
                maxWidth="200px"
              />
            )}
          />

          {/* ✅ Amount */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <CustomFormInput
                label="Amount"
                type="number"
                {...field}
                errormsg={errors.amount?.message}
                className="!w-auto"
                direction="col"
              />
            )}
          />

          {/* ✅ Submit Button */}
          <div className="flex justify-center pt-2">
            <Button text="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRetailerOrder;
