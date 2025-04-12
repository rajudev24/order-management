import { apiDelete, apiPatch, apiPost } from "../../@manush/common/api.js";
import { apiRoutes } from "../../@manush/common/api-routes.js";

export const createPromotion = async (data) => {
  let response = await apiPost(apiRoutes.promotion.PROMOTION_CA, data);
  return response.data;
};

export const updatePromotion = async (itemId, data) => {
  let response = await apiPatch(
    apiRoutes.promotion.PROMOTION_RUD(itemId),
    data,
  );
  return response.data;
};

export const updatePromotionStatus = async (itemId, data) => {
  let response = await apiPatch(
    apiRoutes.promotion.PROMOTION_UPDATE_STATUS_U(itemId),
    data,
  );
  return response.data;
};

export const deletePromotion = async (itemId) => {
  let response = await apiDelete(apiRoutes.promotion.PROMOTION_RUD(itemId));
  return response.data;
};
