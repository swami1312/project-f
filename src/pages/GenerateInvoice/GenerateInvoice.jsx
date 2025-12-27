// import React, { useState } from "react";
// import Header from "../../layouts/Header";
// import Input from "../../components/Input";
// import {
//   CustomDateInput,
//   CustomFormInput,
//   CustomMultiSelect,
//   LabelDateInput,
// } from "../../components/Inputs/Inputs";
// import AddressSelectFromMap from "../../components/AddressSelectFromMap";
// import { Button } from "../../components/Buttons/Buttons";

// const GenerateInvoice = () => {
//   const [product, setProduct] = React.useState([]);
//   const handleAddressSelect = (data) => {
//     console.log("Selected Address:", data);
//   };

//   return (
//     <div className="flex h-full">
//       <div className="flex-1">
//         <Header title="Generate Invoice" />
//         <div className="bg-white rounded-xl shadow overflow-hidden p-4 ">
//           <CustomDateInput
//             label="Date"
//             name="startDate"
//             // required
//             // registerevents={register("startDate")}
//             // errormsg={errors.startDate?.message}
//             onChange={(e) => console.log(e.target.value)}
//           />
//           <CustomMultiSelect
//             label="Select Product :"
//             formControlSx={{ width: "100%" }}
//             items={[
//               { id: 1, name: "Mysore Sandal Agarbathi" },
//               { id: 2, name: "Cycle Pure Agarbathi" },
//               { id: 3, name: "Sri Sai Flora Agarbathi" },
//               { id: 4, name: "Khadi Natural Herbal Soap" },
//               { id: 5, name: "Medimix Ayurvedic Soap" },
//               { id: 6, name: "Chandrika Ayurvedic Soap" },
//               { id: 7, name: "Patanjali Kesh Kanti Shampoo" },
//               { id: 8, name: "Khadi Natural Amla & Bhringraj Shampoo" },
//               { id: 9, name: "Biotique Herbal Shampoo" },
//               { id: 10, name: "Vicco Turmeric Soap" },
//               { id: 11, name: "Gramodaya Herbal Soap" },
//               { id: 12, name: "Nirmal Natural Handmade Soap" },
//               { id: 13, name: "Patanjali Dant Kanti Toothpaste" },
//               { id: 14, name: "Ayush Neem Soap" },
//               { id: 15, name: "Zandu Ayurvedic Bath Soap" },
//             ]}
//             keyValuePair={["id", "name"]}
//             placeholder="Select Products"
//             value={product}
//             onChange={(e) => {
//               setProduct(e.target.value);
//             }}
//           />
//           <AddressSelectFromMap onSelect={handleAddressSelect} />
//           <p>Selected Address</p>
//           <CustomFormInput
//             label="Days"
//             // value={matchedUnit?.unitName || "—"}
//           />
//           <CustomFormInput
//             label="Days"
//             // value={matchedUnit?.unitName || "—"}
//           />{" "}
//           <CustomFormInput
//             label="Days"
//             // value={matchedUnit?.unitName || "—"}
//           />
//           <div className="w-full flex flex-col items-center ">
//             <Button
//               text="Submit
//             "
//               type="submit"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GenerateInvoice;

import React from "react";
import Header from "../../layouts/Header";
import {
  CustomDateInput,
  CustomFormInput,
  CustomLabelText,
  CustomMultiSelect,
  TextInput,
} from "../../components/Inputs/Inputs";
import AddressSelectFromMap from "../../components/AddressSelectFromMap";
import { Button } from "../../components/Buttons/Buttons";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const GenerateInvoice = () => {
  const [invoiceSummary, setInvoiceSummary] = React.useState("");

  const invoiceSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    products: Yup.array().min(1, "Select at least one product").required(),
    // address: Yup.object().required("Address is required"),
    TheNextDays: Yup.number().required("Required").positive().integer(),
    enterprise: Yup.string().required("Required"),
    creditPeriod: Yup.number().required("Required").positive().integer(),
    returnsNotExceeding: Yup.number().required("Required").positive().integer(),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceSchema),
    defaultValues: {
      date: "",
      products: [],
      address: null,
      enterprise: "",
      TheNextDays: "",
      creditPeriod: "",
      returnsNotExceeding: "",
    },
  });

  const onSubmit = (data) => {
    const {
      date,
      products,
      address,
      enterprise,
      TheNextDays,
      creditPeriod,
      returnsNotExceeding,
    } = data;
    console.log("Invoice Form Data:", data);
    const formattedDate = new Date(date).toLocaleDateString("en-IN");

    const productNames = products
      .map((p) => (typeof p === "object" ? p.name : p))
      .join(", ");

    const location =
      address?.city || address?.formattedAddress || "the selected location";

    const summary = `This invoice dated ${formattedDate} for the products legal agreement for the location ${location} from ${enterprise} within the next ${TheNextDays} days and a credit period of not more than ${creditPeriod} days and returns not exceeding ${returnsNotExceeding} days.`;

    setInvoiceSummary(summary);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <Header title="Generate Invoice" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow p-4 space-y-4"
        >
          {/* Date */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <CustomDateInput
                label="Date"
                {...field}
                errormsg={errors.date?.message}
              />
            )}
          />

          {/* Products */}
          <Controller
            name="products"
            control={control}
            render={({ field }) => (
              <CustomMultiSelect
                label="Select Product"
                formControlSx={{ width: "100%" }}
                items={[
                  { id: 1, name: "Mysore Sandal Agarbathi" },
                  { id: 2, name: "Cycle Pure Agarbathi" },
                  { id: 3, name: "Sri Sai Flora Agarbathi" },
                  { id: 4, name: "Khadi Natural Herbal Soap" },
                  { id: 5, name: "Medimix Ayurvedic Soap" },
                ]}
                keyValuePair={["id", "name"]}
                placeholder="Select Products"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                errormsg={errors.products?.message}
              />
            )}
          />

          {/* Address from Map */}
          <AddressSelectFromMap
            onSelect={(data) => {
              setValue("address", data, { shouldValidate: true });
            }}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
          <Controller
            name="enterprise"
            control={control}
            render={({ field }) => (
              <CustomFormInput
                label="Enterprise"
                {...field}
                errormsg={errors.enterprise?.message}
              />
            )}
          />
          {/* Days Inputs */}
          <Controller
            name="TheNextDays"
            control={control}
            render={({ field }) => (
              <CustomFormInput
                label="Next Days"
                {...field}
                errormsg={errors.TheNextDays?.message}
              />
            )}
          />

          <Controller
            name="creditPeriod"
            control={control}
            render={({ field }) => (
              <CustomFormInput
                label="Credit Period"
                {...field}
                errormsg={errors.creditPeriod?.message}
              />
            )}
          />

          <Controller
            name="returnsNotExceeding"
            control={control}
            render={({ field }) => (
              <CustomFormInput
                label="Returns Not Exceeding"
                {...field}
                errormsg={errors.returnsNotExceeding?.message}
              />
            )}
          />

          {/* Submit */}
          <div className="flex justify-center">
            <Button text="Submit" type="submit" />
          </div>
        </form>
        {invoiceSchema && invoiceSummary}
      </div>
    </div>
  );
};

export default GenerateInvoice;
