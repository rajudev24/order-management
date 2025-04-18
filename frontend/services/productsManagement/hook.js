import { apiRoutes } from "../../@manush/common/api-routes.js";
import { useFetch } from "../../@manush/hooks/useFetch.js";

export function useFetchProduct(itemId) {
  const url = itemId ? apiRoutes.product.PRODUCT_RUD(itemId) : null;
  return useFetch(url);
}
