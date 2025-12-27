import { handleQueryParams } from "../utils/functions";

const baseUrl = import.meta.env.APP_API_URL;

const apiEndPoints = {
  getAllInventory: () => `${baseUrl}/api/v1/inventory/${"R-0001"}`,
  getStatesList: () => `${baseUrl}/api-state/state`,
  getProductsList: () => `${baseUrl}/api-product/products`,
  getProductLockReqs: (query) =>
    `${baseUrl}/api/v1/inventory?${handleQueryParams(query)}`,
  postInventory: () => `${baseUrl}/api/v1/inventory`,

  // retailers orders
  postRetailerOrder: () => `${baseUrl}/api-order/place/order`,
  getAllRetailersOrders: () => `${baseUrl}/api-order/orders`,
  postPdf: () => `${baseUrl}/upload`,

  //admin 2
  getretailerLh: () => `${baseUrl}/api/retailer/lh`,
  postLh: () => `${baseUrl}/api/retailer/lh`,
  updateRetailerLockReq: (id) => `${baseUrl}/api/v1/inventory/${id}`,
};

export default apiEndPoints;
