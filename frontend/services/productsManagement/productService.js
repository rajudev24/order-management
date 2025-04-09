import { apiDelete, apiPatch, apiPost } from "../../@manush/common/api.js";
import { apiRoutes } from "../../@manush/common/api-routes.js";

export const createProduct = async (data) => {
  let response = await apiPost(apiRoutes.product.PRODUCT_CA, data);
  return response.data;
};

export const updateProduct = async (itemId, data) => {
  let response = await apiPatch(apiRoutes.product.PRODUCT_RUD(itemId), data);
  return response.data;
};

export const updateProductStatus = async (itemId, data) => {
  let response = await apiPatch(
    apiRoutes.product.PRODUCT_UPDATE_STATUS_U(itemId),
    data,
  );
  return response.data;
};

export const deleteProduct = async (itemId) => {
  let response = await apiDelete(apiRoutes.product.PRODUCT_RUD(itemId));
  return response.data;
};
