import { apiRoutes } from "../../@manush/common/api-routes.js";
import { useFetch } from "../../@manush/hooks/useFetch.js";

export function useFetchPromotion(itemId) {
  const url = itemId ? apiRoutes.promotion.PROMOTION_RUD(itemId) : null;
  return useFetch(url);
}
