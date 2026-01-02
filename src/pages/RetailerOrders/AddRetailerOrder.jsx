import React, { useEffect, useReducer, useState } from "react";
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

  // State for customer names
  const [customerNames, setCustomerNames] = useState(["", "", ""]);

  const schema = Yup.object().shape({
    state: Yup.string().required("State is required"),

    amount: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive"),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      state: "",
      product: [],
      amount: "",
    },
  });

  // Handle customer name input changes
  const handleCustomerNameChange = (index, value) => {
    const newCustomerNames = [...customerNames];
    newCustomerNames[index] = value;
    setCustomerNames(newCustomerNames);
  };

  const onSubmit = (data) => {
    const validCustomerNames = customerNames.filter(
      (name) => name.trim() !== ""
    );

    if (validCustomerNames.length === 0) {
      toast.error("At least one customer name is required");
      return;
    }

    const payload = {
      totalAmount: data.amount,
      retailerId: "R-0001",
      stateId: data.state,
      customerNames: validCustomerNames,
      tenantId: "T1",
    };

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

  // ✅ Fetch States on component mount
  useEffect(() => {
    get({
      apiUrl: apiEndPoints.getStatesList(),
      apiDispatch: statesDispatch,
    });
  }, []);

  // useEffect(() => {
  //   if (selectedStateId) {

  //     setValue("product", []);

  //     get({
  //       apiUrl: apiEndPoints.getstateProductsList({
  //         stateId: selectedStateId,
  //       }),
  //       apiDispatch: productsDispatch,
  //     });
  //   }
  // }, [selectedStateId]);

  // Check if products are loaded and empty
  // const hasProducts = products?.data?.data?.content?.length > 0;
  // const isProductsLoaded = !products.loading && products.data;

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <p className="text-center font-bold mb-4">Add User Order</p>

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
          {/* ✅ Product Multi Select - Show based on conditions */}
          {/* {selectedStateId && (
            <div className="space-y-2">
              {products.loading ? (
                <div className="text-center py-2 text-gray-500">
                  Loading products...
                </div>
              ) : isProductsLoaded && !hasProducts ? (
                <div className="text-center py-2 text-gray-500 border rounded-lg p-3 bg-gray-50">
                  No products available in this state
                </div>
              ) : (
                <Controller
                  name="product"
                  control={control}
                  render={({ field }) => (
                    <CustomMultiSelect
                      label="Product"
                      items={products?.data?.data?.content || []}
                      keyValuePair={["id", "stateProductCode"]}
                      placeholder="Select Products"
                      value={field.value?.map((p) => p.id) || []}
                      multiple={true}
                      onChange={(e) => {
                        const selectedIds = e.target.value;

                        const selectedProducts = products?.data?.data?.content
                          ?.filter((item) => selectedIds.includes(item.id))
                          .map((item) => ({
                            id: item.id,
                            stateProductCode: item.stateProductCode,
                            productId: item.productId,
                          }));

                        field.onChange(selectedProducts);
                      }}
                      errormsg={errors.product?.message}
                      width="200px"
                      maxWidth="200px"
                      disabled={!hasProducts}
                    />
                  )}
                />
              )}
            </div>
          )} */}
          {/* ✅ Customer Names Inputs */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Customer Names
            </label>
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <CustomFormInput
                  label={`Customer ${index + 1}`}
                  type="text"
                  value={customerNames[index]}
                  onChange={(e) =>
                    handleCustomerNameChange(index, e.target.value)
                  }
                  placeholder={`Enter customer ${index + 1} name`}
                  className="!w-auto"
                  direction="col"
                />
              </div>
            ))}
            <p className="text-xs text-gray-500">
              * At least one customer name is required
            </p>
          </div>

          {/* ✅ Submit Button */}
          <div className="flex justify-center pt-2">
            <Button
              text="Submit"
              type="submit"
              disabled={postinventoryState.loading}
              loading={postinventoryState.loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRetailerOrder;
