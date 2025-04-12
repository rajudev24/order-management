import { lazy, Suspense } from "react";
import LoadingSpinner from "../../components/Global/LoadingSpinner.jsx";

const CreateOrderPage = lazy(
  () => import("../../../modules/admin/CreateOrder/CreateOrderPage.jsx"),
);

const Dashboard = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CreateOrderPage />
    </Suspense>
  );
};

export default Dashboard;
