import { apiRoutes } from "../../@manush/common/api-routes.js";
import { useFetch } from "../../@manush/hooks/useFetch.js";

export function useFetchProduct(userId) {
  const url = userId ? apiRoutes.product.PRODUCT_RUD(userId) : null;
  return useFetch(url);
}
