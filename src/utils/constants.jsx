// Application Constants

import { getClientStorage } from "./functions";

// Status options for filtering
const STATUS_OPTIONS = ["Any status", "Paid", "Delivered", "Completed"];

// Price range options
const PRICE_RANGES = [
  "All prices",
  "$0—$100",
  "$100—$500",
  "$500—$1000",
  "$100—$1500",
  "$1000—$2000",
  "$2000+",
];

// Sort options
const SORT_OPTIONS = [
  "Sort by Date",
  "Date (Newest)",
  "Date (Oldest)",
  "Amount (High)",
  "Amount (Low)",
  "Customer (A-Z)",
];

// Status badge colors
const STATUS_COLORS = {
  Paid: {
    bg: "bg-green-100",
    text: "text-green-800",
    bgHex: "#dcfce7",
    textHex: "#166534",
  },
  Delivered: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    bgHex: "#ffedd5",
    textHex: "#9a3412",
  },
  Completed: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    bgHex: "#d1fae5",
    textHex: "#065f46",
  },
  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    bgHex: "#fef3c7",
    textHex: "#92400e",
  },
  Cancelled: {
    bg: "bg-red-100",
    text: "text-red-800",
    bgHex: "#fee2e2",
    textHex: "#991b1b",
  },
};

// Theme colors
const THEME = {
  primary: "#1a1a1a",
  secondary: "#f5f5dc",
  accent: "#c5a572",
  background: "#faf8f5",
  sidebar: "#1a1a1a",
  text: "#333333",
  textLight: "#666666",
  border: "#e5e5e5",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
};

// Export all constants
export const Constants = {
  STATUS_OPTIONS,
  PRICE_RANGES,
  SORT_OPTIONS,
  STATUS_COLORS,
  THEME,
};

//from another project
export const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};
export const apiStatusConditions = {
  failure: (apiState) => apiState.apiStatus === apiStatusConstants.failure,
  success: (apiState) => apiState.apiStatus === apiStatusConstants.success,
  inProgress: (apiState) =>
    apiState.apiStatus === apiStatusConstants.inProgress,
  initial: (apiState) => apiState.apiStatus === apiStatusConstants.initial,
};
export const iconifyIcons = {
  search: "lucide:search",
  order: "prime:list",
  dashboard: "lineicons:dashboard-square-1",
  loading: "codex:loader",
  passwordView: "lets-icons:view-hide-light",
  passwordHide: "lets-icons:view-light",
  done: "mdi:check",
  image: "material-symbols:image-outline",
  tick: "charm:circle-tick",
  threeDots: "mage:dots",
};
export const handleQueryParams = (params) => {
  for (const key in params) {
    if (!params[key] && params[key] !== 0) {
      delete params[key];
    }
  }
  const queryParams = new URLSearchParams({ ...params });
  return queryParams.toString();
};
export const defaultPathForNavigate = (value) => {
  const cs = JSON.parse(getClientStorage() || "{}");
  const role = value ?? cs?.role;

  switch (role) {
    case "ADMIN1":
      return "/admin/products-1";
    case "ADMIN2":
      return "/admin/products-2";
    case "USER":
      return "/user-inventory";
    default:
      return "/login";
  }
};

// export default Constants;
