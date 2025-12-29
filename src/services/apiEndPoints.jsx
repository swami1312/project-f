import { handleQueryParams, userID } from "../utils/functions";

const baseUrl = import.meta.env.APP_API_URL;

const apiEndPoints = {
  getAllInventory: () => `${baseUrl}/api/v1/inventory/${"R-0001"}`,
  getINvProduct: (id) => `${baseUrl}/api/v1/inventory/${id}`,
  getUserInventory: (query) =>
    `${baseUrl}/api/v1/inventory/user/${userID()}?${handleQueryParams(query)}`,
  getStatesList: () => `${baseUrl}/api-state/state`,
  getProductsList: () => `${baseUrl}/api-product/products`,
  ///state wise products
  getstateProductsList: (query) =>
    `${baseUrl}/api-spm/state/products?${handleQueryParams(query)}`,

  getProductLockReqs: (query) =>
    `${baseUrl}/api/v1/inventory?${handleQueryParams(query)}`,
  postInventory: () => `${baseUrl}/api/v1/inventory`,

  // retailers orders
  postRetailerOrder: () => `${baseUrl}/api-order/place/order`,
  getAllRetailersOrders: () => `${baseUrl}/api-order/orders`,
  postPdf: (query) => `${baseUrl}/upload?${handleQueryParams(query)}`,

  //admin 2
  getUserLh: (query) =>
    `${baseUrl}/api/retailer/lh?${handleQueryParams(query)}`,
  postLh: () => `${baseUrl}/api/retailer/lh`,
  updateRetailerLockReq: (id) => `${baseUrl}/api/v1/inventory/${id}`,
  updateUserLh: (id, status, query) =>
    `${baseUrl}/api/retailer/lh/${id}/${status}?${handleQueryParams(query)}`,
};

export default apiEndPoints;
