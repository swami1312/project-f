const baseUrl = import.meta.env.APP_API_URL;

const apiEndPoints = {
  getAllInventory: () => `${baseUrl}/api/v1/inventory/${"R-0001"}`,
  getStatesList: () => `${baseUrl}/api-state/state`,
  getProductsList: () => `${baseUrl}/api-product/products`,
  getProductLockReqs: () => `${baseUrl}/api/v1/inventory`,
  postInventory: () => `${baseUrl}/api/v1/inventory`,

  // retailers orders
  postRetailerOrder: () => `${baseUrl}/api-order/place/order`,
  getAllRetailersOrders: () => `${baseUrl}/api-order/orders`,
  postPdf: () => `${baseUrl}/upload`,
};

export default apiEndPoints;
