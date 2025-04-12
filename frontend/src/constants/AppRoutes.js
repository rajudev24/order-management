import SignIn from "../pages/Auth/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import * as urls from "./AppUrls";
import Products from "../pages/Products/Products.jsx";
import Promotions from "../pages/Promotions/Promotions.jsx";
import Orders from "../pages/Orders/Orders.jsx";
import CreateOrders from "../pages/CreateOrder/CreateOrder.jsx";

const route = [
  // UNPROTECTED ROUTES
  {
    path: urls.SIGNIN,
    Element: SignIn,
    isIndexUrl: true,
    isProtected: false,
  },
  // PROTECTED ROUTES
  {
    path: urls.DASHBOARD,
    name: "Dashboard",
    Element: Dashboard,
    isIndexUrl: true,
    isProtected: true,
    showInSidebar: true,
  },
  {
    path: urls.PRODUCTS,
    name: "Products",
    Element: Products,
    isIndexUrl: false,
    isProtected: true,
    showInSidebar: true,
  },
  {
    path: urls.PROMOTIONS,
    name: "Promotions",
    Element: Promotions,
    isIndexUrl: false,
    isProtected: true,
    showInSidebar: true,
  },
  {
    path: urls.CREATE_ORDERS,
    name: "Make Orders",
    Element: CreateOrders,
    isIndexUrl: false,
    isProtected: true,
    showInSidebar: true,
  },
  {
    path: urls.ORDERS,
    name: "Ordered Products",
    Element: Orders,
    isIndexUrl: false,
    isProtected: true,
    showInSidebar: true,
  },
];

export default route;
