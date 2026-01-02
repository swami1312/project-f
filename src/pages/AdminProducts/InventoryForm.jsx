import * as React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Button } from "../../components/Buttons/Buttons";
import { TableComponent } from "../../components/Table/Table";
import { Icon } from "@iconify/react";
import Header from "../../layouts/Header";
import useApiServices from "../../services/apiServices";
import apiEndPoints from "../../services/apiEndPoints";
import useHandleResponse from "../../Hooks/useHandleResponse";
import useRouteInformation from "../../Hooks/useRouteInformation";
import { apiReducer, initialState } from "../../services/apiReducer";
import { toast } from "react-toastify";
import {
  convertWeirdDateToDDMMYY,
  getDateYYYYMMDD,
} from "../../utils/functions";

const InventoryForm = React.forwardRef((_, ref) => {
  const [updateState, updateDispatch] = React.useReducer(
    apiReducer,
    initialState
  );

  const [apiState, apiDispatch] = React.useReducer(apiReducer, initialState);
  const formRef = React.useRef(null);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [inventory, setInventory] = React.useState([]);
  const fileFormData = React.useRef(null);
  const { post, get, put } = useApiServices();
  const { handleResponse } = useHandleResponse();
  const { pathParams, navigate } = useRouteInformation();
  const [data, setdata] = React.useState({
    id: "--",
    productId: "--",
    quantity: 0,
    retailerId: "--",
    stateId: "-",
    status: "-",
    productCode: "--",
    date: "-",
  });

  const validate = () => {
    const newErrors = {};

    if (start === "") newErrors.start = "Start serial is required";
    if (end === "") newErrors.end = "End serial is required";

    if (start !== "" && end !== "") {
      if (Number(start) >= Number(end)) {
        newErrors.start = "Start must be less than End";
        newErrors.end = "End must be greater than Start";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) return;

    const startNum = Number(start);
    const endNum = Number(end);

    const list = Array.from({ length: endNum - startNum + 1 }, (_, index) => ({
      id: startNum + index,
      status: "Y",
    }));

    setInventory(list);
  };

  const handlePdfUpload = (event, id) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed");
      event.target.value = "";
      return;
    } else {
      const formData = new FormData();
      formData.append("file", file, file.name);
      fileFormData.current = formData;
      fileupload(formData, id);
      event.target.value = null;
    }
  };

  const fileupload = (fileFormData, id) => {
    post({
      apiUrl: apiEndPoints.postPdf({
        productCode: data.productCode,
        tenantId: "T1",
        latterHeadSerialNumber: id,
      }),
      type: "file",
      body: fileFormData,
      callBackFunction: (res) => {
        handleResponse(res, {
          success: () => {
            setInventory((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, pdf: res.data } : item
              )
            );
          },
        });
      },
    });
  };
  React.useImperativeHandle(ref, () => inventory);

  const getEachProduct = () => {
    get({
      apiUrl: apiEndPoints.getINvProduct(pathParams.riID),
      apiDispatch,
      callBackFunction: (res) => {
        if (res.success) {
          setdata(res.data);
        }
      },
    });
  };
  React.useEffect(() => {
    getEachProduct();
  }, []);

  const submit = async () => {
    const uploadedItems = inventory.filter((item) => item.pdf);

    if (inventory.length !== uploadedItems.length) {
      toast.error("Please upload all PDF Files");
      return;
    }

    try {
      // Wait for all API calls
      await Promise.all(
        uploadedItems.map(
          (each) =>
            new Promise((resolve, reject) => {
              post({
                apiUrl: apiEndPoints.postLh(),
                body: {
                  inventoryId: data.id,
                  retailerSerialNumber: each.id,
                  latterHeadImageUrl: each.pdf,
                  currentMonth: getDateYYYYMMDD(),
                  userId: data.retailerId,
                  latterHeadContent: "",
                  tenantId: "T1",
                  productCode: data.productCode,
                },
                apiDispatch: updateDispatch,
                callBackFunction: (res) => {
                  if (res.success) {
                    resolve(true);
                  } else {
                    reject(res);
                  }
                },
              });
            })
        )
      );

      // Update retailer status after all uploads succeed
      await put({
        apiUrl: apiEndPoints.updateRetailerLockReq(data.id),
        body: {
          ...data,
          tenantId: "T1",
          status: "ADDED-INV",
        },
      });
      toast.success("Inventory updated successfully");
      navigate("/admin/products-1");
    } catch (error) {
      toast.error("Failed to upload inventory. Please try again.");
    }
  };

  return (
    <div>
      <Header title="Generate Inventory" />

      <div className="max-w-jg rounded-xl border border-gray-200 bg-white shadow-md p-5 hover:shadow-lg transition mb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Inventory Details
          </h3>

          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full
        ${
          data.status === "PENDING"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
        }`}
          >
            {data.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
          {/* ID */}
          <div className="flex min-w-[140px]">
            <span className="font-medium text-gray-700 w-24">ID:</span>
            <span className="break-words">{data.id}</span>
          </div>

          {/* Product ID */}
          <div className="flex min-w-[140px]">
            <span className="font-medium text-gray-700 w-24">
              Product Code:
            </span>
            <span className="break-words">{data.productCode}</span>
          </div>

          {/* Quantity */}
          <div className="flex min-w-[140px]">
            <span className="font-medium text-gray-700 w-24">Quantity:</span>
            <span>{data.quantity}</span>
          </div>

          {/* State ID */}
          <div className="flex min-w-[140px]">
            <span className="font-medium text-gray-700 w-24">State Code:</span>
            <span>{data.stateCode}</span>
          </div>

          {/* Date */}
          <div className="flex min-w-[140px]">
            <span className="font-medium text-gray-700 w-24">Date:</span>
            <span>{convertWeirdDateToDDMMYY(data.date)}</span>
          </div>
        </div>
      </div>

      <Box
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        gap={2}
        mb={2}
        p={2}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <TextField
          label="Serial No Start"
          type="number"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          error={!!errors.start}
          helperText={errors.start}
          size="small"
        />

        <TextField
          label="Serial No End"
          type="number"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          error={!!errors.end}
          helperText={errors.end}
          size="small"
        />

        <Button onClick={handleGenerate} text="Generate" />
      </Box>

      {/* Inventory List */}
      {inventory.length > 0 && (
        <div className="table-container max-h-[50vh]">
          <table>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>File</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>

                  <td>
                    <IconButton size="small" component="label">
                      <Icon icon="ep:upload-filled" width={20} />
                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) => handlePdfUpload(e, row.id)}
                      />
                    </IconButton>{" "}
                  </td>

                  <td>
                    {row.pdf ? (
                      <Icon
                        icon="hugeicons:tick-01"
                        className="inline text-[#057823] text-[20px]"
                      />
                    ) : (
                      "---"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center mt-2">
            <Button onClick={submit} text="Submit" />
          </div>
        </div>
      )}
    </div>
  );
});

export default InventoryForm;
