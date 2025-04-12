/**
 * C -> CREATE
 * A -> FETCH ALL
 * R -> READ
 * U -> UPDATE
 * D -> DELETE
 */
import { PUBLIC_API_BASE_URL } from "./envConstants.js";

const API_BASE_URL = PUBLIC_API_BASE_URL + "/api/v1";

export const apiRoutes = Object.freeze({
  auth: {
    USER_LOGIN: `${API_BASE_URL}/auth/login`,
  },
  product: {
    PRODUCT_CA: `${API_BASE_URL}/products`,
    PRODUCT_RUD: (itemId) => `${API_BASE_URL}/products/${itemId}`,
    PRODUCT_UPDATE_STATUS_U: (itemId) =>
      `${API_BASE_URL}/products/updateStatus/${itemId}`,
  },
  promotion: {
    PROMOTION_CA: `${API_BASE_URL}/promotions`,
    PROMOTION_RUD: (itemId) => `${API_BASE_URL}/promotions/${itemId}`,
    PROMOTION_UPDATE_STATUS_U: (itemId) =>
      `${API_BASE_URL}/promotions/updateStatus/${itemId}`,
  },
  orders: {
    AVAILABLE_PRODUCTS: `${API_BASE_URL}/orders/available-products`,
    CREATE_ORDER: `${API_BASE_URL}/orders/create-order`,
    ORDERED_PRODUCTS: `${API_BASE_URL}/orders/ordered-items`,
  },
});
