import { lazy, Suspense } from "react";
import LoadingSpinner from "../../components/Global/LoadingSpinner.jsx";

const DashboardPage = lazy(
  () => import("../../../modules/admin/Dashboard/DashboardPage.jsx"),
);

const Dashboard = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardPage />
    </Suspense>
  );
};

export default Dashboard;
