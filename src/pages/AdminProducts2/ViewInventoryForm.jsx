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
import { Link } from "react-router-dom";
import Popup from "../../components/Popups/Popup";

const ViewInventoryForm = React.forwardRef((_, ref) => {
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
  const [showPopup, setShowPopup] = React.useState(false);
  const [decision, setDecision] = React.useState(""); // APPROVED / REJECTED
  const [remarks, setRemarks] = React.useState("");
  const [selectedID, setselectedID] = React.useState();
  const [selectedPdfUrl, setSelectedPdfUrl] = React.useState("");

  const [data, setdata] = React.useState({
    id: "--",
    productId: "--",
    quantity: 0,
    retailerId: "--",
    stateId: "-",
    status: "-",
    date: "-",
  });
  console.log(data);

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

  const handleOpenPdfWithDecision = (pdfUrl, rowId, rowStatus) => {
    if (rowStatus === "PENDING") {
      setSelectedPdfUrl(pdfUrl);
      setselectedID(rowId);
      setDecision("");
      setRemarks("");
      setShowPopup(true);
    } else {
      // If not PENDING, just open PDF in new tab
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleSubmitDecision = () => {
    if (decision === "REJECTED" && !remarks.trim()) {
      toast.error("Please enter rejection reason");
      return;
    }

    submitDecisionApi();
  };

  const submitDecisionApi = () => {
    put({
      apiUrl: apiEndPoints.updateUserLh(selectedID, decision, {
        remarks: decision === "REJECTED" ? remarks : "",
      }),

      callBackFunction: (res) => {
        if (res.success) {
          toast.success(`Inventory ${decision.toLowerCase()} successfully`);
          setShowPopup(false);
          setDecision("");
          setRemarks("");
          // Update the inventory list
          setInventory((prev) =>
            prev.map((item) =>
              item.id === selectedID ? { ...item, status: decision } : item
            )
          );
          getuserLhApiCall();
        }
      },
    });
  };

  const fileupload = (fileFormData, id) => {
    post({
      apiUrl: apiEndPoints.postPdf({
        productId: data.productId,
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
          getuserLhApiCall();
        }
      },
    });
  };

  const getuserLhApiCall = () => {
    get({
      apiUrl: apiEndPoints.getUserLh({
        status: "PENDING",
        inventoryId: pathParams.riID,
      }),
      apiDispatch,
      callBackFunction: (res) => {
        if (res.success) {
          setInventory(res.data.content);
        }
        if (res.data.content.length === 0) {
          put({
            apiUrl: apiEndPoints.updateRetailerLockReq(pathParams.riID),
            body: {
              ...data,
              tenantId: "T1",
              status: "CONFIRM",
            },
            callBackFunction: (res) => {
              if (res.success) {
                toast.success("Inventory updated successfully");
                navigate("/admin/products-2");
              }
            },
          });
        }
      },
    });
  };

  React.useEffect(() => {
    getEachProduct();
  }, []);

  // Clear remarks when decision changes from REJECTED to APPROVED
  React.useEffect(() => {
    if (decision === "APPROVED") {
      setRemarks("");
    }
  }, [decision]);

  const submit = async () => {
    const uploadedItems = inventory.filter((item) => item.pdf);

    if (uploadedItems.length === 0) {
      toast.error("Please upload at least one PDF");
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
                  latterHeadContent: "",
                  tenantId: "T1",
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
          status: "ADDED-INV",
        },
      });

      toast.success("Inventory updated successfully");
    } catch (error) {
      toast.error("Failed to upload inventory. Please try again.");
    }
  };

  // PDF Viewer and Decision Form Content
  const popupContent = React.useMemo(() => {
    if (!showPopup || !selectedPdfUrl) return null;

    return (
      <div className="flex flex-col h-full">
        {/* PDF Viewer */}
        <div className="flex-1 mb-4 border rounded-lg overflow-hidden">
          <iframe
            src={selectedPdfUrl}
            title="PDF Viewer"
            className="w-full h-full min-h-[400px]"
            frameBorder="0"
          />
        </div>

        {/* Decision Form */}
        <div className="border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">
            Approve/Reject Inventory
          </h4>

          <div className="space-y-4">
            {/* Radio buttons for decision */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="decision"
                  value="APPROVED"
                  checked={decision === "APPROVED"}
                  onChange={(e) => setDecision(e.target.value)}
                />
                <span className="text-green-600 font-medium">Approve</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="decision"
                  value="REJECTED"
                  checked={decision === "REJECTED"}
                  onChange={(e) => setDecision(e.target.value)}
                />
                <span className="text-red-600 font-medium">Reject</span>
              </label>
            </div>

            {/* Rejection reason textarea */}
            <div
              style={{
                opacity: decision === "REJECTED" ? 1 : 0.7,
                pointerEvents: decision === "REJECTED" ? "auto" : "none",
              }}
            >
              <TextField
                label="Rejection Reason"
                placeholder="Enter rejection reason"
                multiline
                rows={3}
                fullWidth
                size="small"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                disabled={decision !== "REJECTED"}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor:
                      decision === "REJECTED" ? "transparent" : "#f5f5f5",
                  },
                  "& .MuiInputBase-input": {
                    color: decision === "REJECTED" ? "inherit" : "#999",
                  },
                }}
                helperText={
                  decision === "REJECTED"
                    ? "Required for rejection"
                    : "Only required when rejecting"
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }, [showPopup, selectedPdfUrl, decision, remarks]);

  return (
    <div>
      <Header title="View Inventory" />

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

      {/* Inventory List */}
      {inventory.length > 0 && (
        <div className="table-container max-h-[50vh]">
          <table>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>File</th>
                <th>Status</th>
                {/* <th>Act</th> */}
              </tr>
            </thead>

            <tbody>
              {inventory.map((row, index) => (
                <tr key={row.id}>
                  <td>{row.retailerSerialNumber}</td>

                  <td>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleOpenPdfWithDecision(
                          row.latterHeadImageUrl,
                          row.id,
                          row.status
                        )
                      }
                    >
                      <Icon icon="catppuccin:pdf" width={20} />
                    </IconButton>
                  </td>

                  <td>
                    {row.status === "PENDING" && (
                      <Icon
                        icon="hugeicons:time-02"
                        className="inline text-yellow-500 text-[20px]"
                      />
                    )}

                    {row.status === "APPROVED" && (
                      <Icon
                        icon="hugeicons:tick-01"
                        className="inline text-green-600 text-[20px]"
                      />
                    )}
                    {row.status === "REJECTED" && (
                      <Icon
                        icon="hugeicons:cancel-01"
                        className="inline text-red-600 text-[20px]"
                      />
                    )}
                  </td>
                  {/* <td>
                    {row.status === "PENDING" && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleOpenPdfWithDecision(
                            row.latterHeadImageUrl,
                            row.id,
                            row.status
                          )
                        }
                      >
                        <Icon icon="material-symbols:edit-outline" width={20} />
                      </IconButton>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup for PDF viewing and decision making */}
      <Popup
        open={showPopup}
        title="PDF Viewer & Decision"
        content={popupContent}
        primaryText="Submit"
        secondaryText="Close"
        onPrimary={handleSubmitDecision}
        onSecondary={() => {
          setShowPopup(false);
          setDecision("");
          setRemarks("");
          setSelectedPdfUrl("");
          setselectedID(null);
        }}
        maxWidth="lg"
        fullWidth
        size="large"
      />
    </div>
  );
});

export default ViewInventoryForm;
