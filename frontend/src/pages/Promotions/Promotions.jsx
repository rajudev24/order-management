import { lazy, Suspense } from "react";
import LoadingSpinner from "../../components/Global/LoadingSpinner.jsx";

const PromotionsPage = lazy(
  () => import("../../../modules/admin/Promotions/PromotionsPage.jsx"),
);

const Products = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PromotionsPage />
    </Suspense>
  );
};

export default Products;
