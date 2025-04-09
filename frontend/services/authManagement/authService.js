import { apiPost } from "../../@manush/common/api.js";
import { apiRoutes } from "../../@manush/common/api-routes.js";

export const logInUser = async (data) => {
  let response = await apiPost(apiRoutes.auth.USER_LOGIN, data);
  return response.data;
};
