import { lazy, Suspense } from "react";
import LoadingSpinner from "../../components/Global/LoadingSpinner.jsx";

const OrdersPage = lazy(
  () => import("../../../modules/admin/Orders/OrdersPage.jsx"),
);

const Products = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <OrdersPage />
    </Suspense>
  );
};

export default Products;
