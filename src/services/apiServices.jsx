import { apiStatusConstants } from "../Utils/constants";
import axios from "axios";
import { useCallback } from "react";
const api = axios.create({
  baseURL: import.meta.env.APP_API_URL,
  // timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try refreshing the token
      const newToken = ``;
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config); // retry original request
      }
      // If refresh fails → logout
      // sessionStorage.clear();
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const getContentDisposition = (response) => {
  const contentDis = response.headers["content-disposition"]
    .replace("attachment;", "")
    .replace(" filename=", "");
  const file = new File([response.data], contentDis, {
    type: response.data.type,
  });

  return file;
};

const useApiServices = () => {
  const handleErrors = ({
    response,
    apiDispatch,
    callBackFunction,
    responseType,
  }) => {
    if ([200, 201].includes(response.status)) {
      if (response.data.success) {
        callBackFunction && callBackFunction(response.data);
        apiDispatch &&
          apiDispatch({
            apiStatus: apiStatusConstants.success,
            payload: response.data,
          });
      } else {
        apiDispatch &&
          apiDispatch({
            apiStatus: apiStatusConstants.failure,
            payload:
              responseType === "blob"
                ? getContentDisposition(response)
                : response.data,
          });
        callBackFunction &&
          callBackFunction(
            responseType === "blob"
              ? getContentDisposition(response)
              : response.data
          );
      }
    } else {
      callBackFunction && callBackFunction(response.data);
      apiDispatch({
        apiStatus: apiStatusConstants.failure,
        payload: response.data,
      });
    }
  };

  const get = useCallback(
    async ({
      apiUrl,
      apiDispatch,
      callBackFunction,
      controller,
      responseType,
      type,
    }) => {
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });

      try {
        const options = {
          headers: {
            "Content-Type":
              type === "file"
                ? "*/*"
                : type === "m"
                ? "multipart/form-data"
                : "application/json",
          },
          responseType: responseType || "json",
        };
        if (controller) {
          options.signal = controller?.signal;
        }
        const response = await api.get(apiUrl, options);

        handleErrors({ response, apiDispatch, callBackFunction });
      } catch (e) {
        if (controller && (axios.isCancel?.(e) || e.name === "CanceledError")) {
          return;
        }

        const errorData = e.response?.data || {
          success: false,
          message: e.message,
        };
        callBackFunction && callBackFunction(errorData);
        apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
      }
    },
    []
  );

  const put = useCallback(
    async ({
      apiUrl,
      apiDispatch,
      callBackFunction,
      controller,
      responseType,
      type,
      body,
    }) => {
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
      try {
        const options = {
          headers: {
            "Content-Type":
              type === "file"
                ? "*/*"
                : type === "m"
                ? "multipart/form-data"
                : "application/json",
          },
          responseType: responseType || "json",
        };
        if (controller) {
          options.signal = controller?.signal;
        }
        const response = await api.put(apiUrl, body, options);
        handleErrors({ response, apiDispatch, callBackFunction });
      } catch (e) {
        const errorData = e.response?.data || {
          success: false,
          message: e.message,
        };
        callBackFunction && callBackFunction(errorData);
        apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
      }
    },
    []
  );

  const post = useCallback(
    async ({
      apiUrl,
      apiDispatch,
      callBackFunction,
      controller,
      responseType,
      type,
      body,
    }) => {
      apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.inProgress });
      try {
        const options = {
          headers: {
            id: "12121",
            "Content-Type":
              type === "file"
                ? "*/*"
                : type === "m"
                ? "multipart/form-data"
                : "application/json",
            // "ACIN-API-KEY": "ACIN-SDGESDFYRGFSDF",
          },
          responseType: responseType || "json",
        };
        if (controller) {
          options.signal = controller?.signal;
        }
        const response = await api.post(apiUrl, body, options);
        handleErrors({ response, apiDispatch, callBackFunction, responseType });
      } catch (e) {
        const errorData = e.response?.data || {
          success: false,
          message: e.message,
        };
        callBackFunction && callBackFunction(errorData);
        apiDispatch && apiDispatch({ apiStatus: apiStatusConstants.failure });
      }
    },
    []
  );

  const del = () => {};

  return { post, put, get, del };
};

export default useApiServices;
