import { toast } from "react-toastify";

export const handleQueryParams = (params) => {
  for (const key in params) {
    if (!params[key] && params[key] !== 0) {
      delete params[key];
    }
  }
  const queryParams = new URLSearchParams({ ...params });
  return queryParams.toString();
};

export const isPhoneNumber = (searchq) => {
  return /^[0-9]+$/.test(searchq?.trim() || "");
};

export const getClientStorage = () => {
  return sessionStorage.getItem("loginCred");
};
export function convertDateFormatYYMMDDtoDDMMYY(dateString) {
  if (!dateString) {
    return "---";
  }
  const dateParts = dateString.split("-");
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return formattedDate;
}
export function to12HourFormat(time24) {
  // Remove milliseconds if present
  const [hms] = time24.split(".");
  const [hhStr, mm] = hms.split(":");
  let hh = parseInt(hhStr, 10);

  const suffix = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  if (hh === 0) hh = 12;

  // pad hour to 2 digits
  const hhPadded = String(hh).padStart(2, "0");

  return `${hhPadded}:${mm} ${suffix}`;
}
export const saveBlobAsFile = async (
  blob,
  fileName = "example.xlsx",
  toastMessage
) => {
  const isJson = blob.type === "application/json";
  if (blob?.success === false) {
    toast.error(blob?.message || "Something went wrong");
    return;
  }
  if (isJson) {
    const text = await blob.text();
    const json = JSON.parse(text);
    toast.error(json.message);
    return;
  }
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", blob?.name || fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  toastMessage && toast.success(toastMessage);
};
export function convertWeirdDateToDDMMYY(dateString) {
  if (!dateString) return "---";

  const date = new Date(dateString);
  if (isNaN(date)) return "---";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
