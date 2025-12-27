const baseUrl = import.meta.env.APP_API_URL;

const apiEndPoints = {
  getAllInventory: () => `${baseUrl}/api/v1/inventory/${"R-0001"}`,
  getStatesList: () => `${baseUrl}/api-state/state`,
  getProductsList: () => `${baseUrl}/api-product/products`,
  postInventory: () => `${baseUrl}/api/v1/inventory`,
};

export default apiEndPoints;
