import axios from "axios";
import {
  apiStatusConstants,
  axiostokenExpiredFunction,
  getAuthorization,
  getClientStorageInfo,
} from "../Utils/Utils";
import { getDecryptParams } from "../Utils/EC&BCParams";

const handleErrors = async ({ response, apiDispatch, callBackFunction }) => {
  if (response.status === 200) {
    callBackFunction && callBackFunction(response);
    apiDispatch &&
      apiDispatch({
        apiStatus: apiStatusConstants.success,
        payload: response.data,
      });
  } else {
    callBackFunction && callBackFunction(response);
    apiDispatch &&
      apiDispatch({
        apiStatus: apiStatusConstants.failure,
        payload: response.data,
      });
  }
};

const apiServices = {
  getApiService: ({
    apiUrl,
    apiDispatch,
    callBackFunction,
    type,
    responseType,
    token,
    controller,
  }) => {
    const apiRequest = async () => {
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
      const options = () => ({
        headers: {
          Authorization: getAuthorization(token),
          "Content-Type": type === "file" ? "*/*" : "application/json",
        },
        timeout: 1000000,
        responseType: responseType || "json",
        signal: controller?.signal,
      });
      if (controller) {
        options.signal = controller?.signal;
      }

      try {
        const response = await axios.get(apiUrl, options());
        return handleErrors({
          response,
          apiDispatch,
          callBackFunction,
          responseType,
        });
      } catch (error) {
        if (
          controller &&
          (axios.isCancel?.(error) || error.name === "CanceledError")
        ) {
          return;
        }
        axiostokenExpiredFunction(error, apiRequest);
        callBackFunction && callBackFunction(error);
        apiDispatch &&
          apiDispatch({
            apiStatus: apiStatusConstants.failure,
            payload: error,
          });
      }
    };
    apiRequest();
  },

  postApiService: ({
    apiUrl,
    apiDispatch,
    body,
    callBackFunction,
    type,
    responseType,
    token,
  }) => {
    const apiRequest = async () => {
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
      const options = () => ({
        headers: {
          Authorization: getAuthorization(token),
          "Content-Type":
            type === "m" ? "multipart/form-data" : "application/json",
        },
        timeout: 200000,
        responseType: responseType || "json",
      });
      try {
        const response = await axios.post(apiUrl, body, options());
        return handleErrors({ response, apiDispatch, callBackFunction, type });
      } catch (error) {
        axiostokenExpiredFunction(error, apiRequest);
        apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
        callBackFunction && callBackFunction(error);
      }
    };
    apiRequest();
  },

  putApiService: ({ apiUrl, apiDispatch, body, callBackFunction, token }) => {
    const apiRequest = async () => {
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
      const options = () => ({
        headers: {
          Authorization: getAuthorization(token),
          "Content-Type": "application/json",
        },
        timeout: 200000,
      });
      try {
        const response = await axios.put(apiUrl, body, options());
        handleErrors({ response, apiDispatch, callBackFunction });
      } catch (error) {
        axiostokenExpiredFunction(error, apiRequest);
        apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
        callBackFunction && callBackFunction(error);
      }
    };
    apiRequest();
  },

  deleteApiService: ({
    apiUrl,
    apiDispatch,
    body,
    callBackFunction,
    token,
  }) => {
    const apiRequest = async () => {
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
      const options = () => ({
        headers: {
          Authorization: getAuthorization(token),
          "Content-Type": "application/json",
        },
        timeout: 200000,
        data: body,
      });
      try {
        const response = await axios.delete(apiUrl, options());
        return handleErrors({ response, apiDispatch, callBackFunction });
      } catch (error) {
        axiostokenExpiredFunction(error, apiRequest);
        apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
        callBackFunction && callBackFunction(error);
      }
    };
    apiRequest();
  },
};

const apiOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${
      getDecryptParams(sessionStorage.getItem("profile-info")).token
    }`,
    "Content-type": "application/json",
  },
};

const getApiOptions = () => ({
  method: "GET",
  headers: {
    Authorization: getAuthorization(),
    "Content-type": "application/json",
  },
});

export { apiServices, apiOptions, getApiOptions };
