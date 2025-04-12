import { apiPost } from "../../@manush/common/api.js";
import { apiRoutes } from "../../@manush/common/api-routes.js";

export const createOrder = async (data) => {
  let response = await apiPost(apiRoutes.orders.CREATE_ORDER, data);
  return response.data;
};
