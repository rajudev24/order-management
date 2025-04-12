import { apiRoutes } from "../../@manush/common/api-routes.js";
import { useFetch } from "../../@manush/hooks/useFetch.js";

export function useFetchProducts() {
  const url = apiRoutes.orders.AVAILABLE_PRODUCTS;
  return useFetch(url);
}

export function useFetchOrderedProducts() {
  const url = apiRoutes.orders.ORDERED_PRODUCTS;
  return useFetch(url);
}
