import { lazy, Suspense } from "react";
import LoadingSpinner from "../../components/Global/LoadingSpinner.jsx";

const ProductsPage = lazy(
  () => import("../../../modules/admin/products/ProductsPage.jsx"),
);

const Products = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsPage />
    </Suspense>
  );
};

export default Products;
